import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import PatientService from "../services/patients";
import { Patient, Diagnosis, EntryWithoutId } from "../types";
import EntryDetails from "./EntryDetails";
import Togglable from "./Togglable";
import axios from "axios";
import NewEntryForm from "./NewEntryForm";

const formatError = (data: unknown): string => {
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
        <NewEntryForm
          onSubmit={submitNewEntry}
          error={error}
          diagnoses={diagnoses}
        />
      </Togglable>
    </div>
  );
};

export default PatientPage;
