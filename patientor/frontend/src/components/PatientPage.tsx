import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import PatientService from "../services/patients";
import {
  Patient,
  Diagnosis,
  HealthCheckRating,
  EntryWithoutId,
} from "../types";
import EntryDetails from "./EntryDetails";
import Togglable from "./Togglable";
import axios from "axios";

import { TextField } from "@mui/material";
import Alert from "@mui/material/Alert";

// Turns the backend's Zod issues into "date: Invalid ISO date"
const formatError = (data: unknown): string => {
  // Narrow: is it { error: [...] }?
  if (
    typeof data === "object" &&
    data !== null &&
    "error" in data &&
    Array.isArray(data.error)
  ) {
    return data.error
      .map(
        (issue: { path?: string[]; message?: string }) =>
          `${issue.path?.join(".") ?? "field"}: ${issue.message ?? "invalid"}`,
      )
      .join(", ");
  }
  return "Unknown error";
};

interface Props {
  diagnoses: Diagnosis[];
}

const PatientPage = ({ diagnoses }: Props) => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
        try {
          const patientData = await PatientService.getOne(id);
          setPatient(patientData);
          setLoading(false);
        } catch (error: unknown) {
          console.error("Error fetching patient data:", error);
          setLoading(false);
        }
      }
    };

    void fetchPatient();
  }, [id]);

  const submitNewEntry = async (entry: EntryWithoutId) => {
    if (!patient) return;
    try {
      const savedEntry = await PatientService.addEntry(patient.id, entry);
      setPatient({
        ...patient,
        entries: [...patient.entries, savedEntry],
      });
      setError(undefined);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        setError(formatError(e.response?.data));
      } else {
        setError("Unknown error");
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!patient) {
    return <div>Patient not found</div>;
  }
  return (
    <div>
      <h2>
        {patient.name} - {patient.dateOfBirth}
      </h2>
      <p>Occupation: {patient.occupation}</p>
      <p>Gender: {patient.gender}</p>
      <p>SSN: {patient.ssn}</p>

      <h3>entries</h3>
      {patient.entries.map((entry) => (
        <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
      ))}

      <br></br>

      <Togglable buttonLabel="Add New Entry">
        <NewEntryForm onSubmit={submitNewEntry} error={error} />
      </Togglable>
    </div>
  );
};

export default PatientPage;

interface NewEntryProps {
  onSubmit: (entry: EntryWithoutId) => void;
  error?: string;
}
const NewEntryForm = ({ onSubmit, error }: NewEntryProps) => {
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState(0);
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onSubmit({
      type: "HealthCheck",
      date,
      description,
      specialist,
      healthCheckRating: Number(healthCheckRating) as HealthCheckRating, // Number(...) as HealthCheckRating
      diagnosisCodes,
    });
    setDate("");
    setDescription("");
    setSpecialist("");
    setHealthCheckRating(0);
    setDiagnosisCodes([]);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1em",
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "12px 16px",
        backgroundColor: "#fafafa",
      }}
    >
      {error && <Alert severity="error">{error}</Alert>}
      <h3>New Entry</h3>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "1em" }}
      >
        <TextField
          id="date-input"
          label="Date"
          variant="standard"
          required
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <TextField
          id="description-input"
          label="Description"
          variant="standard"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <TextField
          id="specialist-input"
          label="Specialist"
          variant="standard"
          required
          value={specialist}
          onChange={(e) => setSpecialist(e.target.value)}
        />
        <TextField
          id="health-check-rating-input"
          label="Health Check Rating (0 - 3)"
          variant="standard"
          required
          value={healthCheckRating}
          onChange={(e) => setHealthCheckRating(Number(e.target.value))}
          error={healthCheckRating < 0 || healthCheckRating > 3}
        />
        <TextField
          id="diagnosis-codes-input"
          label="Diagnosis Codes"
          variant="standard"
          value={diagnosisCodes.join(",")}
          onChange={(e) =>
            setDiagnosisCodes(
              e.target.value.split(",").map((code) => code.trim()),
            )
          }
        />
        <button type="submit">Add Entry</button>
      </form>
    </div>
  );
};
