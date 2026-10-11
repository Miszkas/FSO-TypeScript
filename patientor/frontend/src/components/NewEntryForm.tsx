import { useState } from "react";
import { assertNever } from "../utils";
import { HealthCheckRating, EntryWithoutId, Entry } from "../types";

import { TextField } from "@mui/material";
import Alert from "@mui/material/Alert";
import NativeSelect from "@mui/material/NativeSelect";

interface NewEntryProps {
  onSubmit: (entry: EntryWithoutId) => void;
  error?: string;
}
const NewEntryForm = ({ onSubmit, error }: NewEntryProps) => {
  const [entryType, setEntryType] = useState<Entry["type"]>("HealthCheck");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const [healthCheckRating, setHealthCheckRating] = useState(0);

  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStart, setSickLeaveStart] = useState("");
  const [sickLeaveEnd, setSickLeaveEnd] = useState("");

  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const baseSubmission = {
      date,
      description,
      specialist,
      diagnosisCodes: diagnosisCodes.length > 0 ? diagnosisCodes : undefined,
    };

    switch (entryType) {
      case "HealthCheck":
        onSubmit({
          ...baseSubmission,
          type: "HealthCheck",
          healthCheckRating: healthCheckRating as HealthCheckRating,
        });
        break;
      case "OccupationalHealthcare":
        onSubmit({
          ...baseSubmission,
          type: "OccupationalHealthcare",
          employerName,
          sickLeave:
            sickLeaveStart && sickLeaveEnd
              ? { startDate: sickLeaveStart, endDate: sickLeaveEnd }
              : undefined,
        });
        break;
      case "Hospital":
        onSubmit({
          ...baseSubmission,
          type: "Hospital",
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria,
          },
        });
        break;
      default:
        assertNever(entryType);
    }

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
        <NativeSelect
          value={entryType}
          onChange={(e) => setEntryType(e.target.value as Entry["type"])}
        >
          <option value={"HealthCheck"}>Health Check</option>
          <option value={"OccupationalHealthcare"}>
            Occupational Healthcare
          </option>
          <option value={"Hospital"}>Hospital</option>
        </NativeSelect>
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
        {entryType === "HealthCheck" && (
          <HealthCheckForm
            healthCheckRating={healthCheckRating}
            setHealthCheckRating={setHealthCheckRating}
          />
        )}
        {entryType === "OccupationalHealthcare" && (
          <OccupationalHealthcareForm
            employerName={employerName}
            setEmployerName={setEmployerName}
            sickLeaveStart={sickLeaveStart}
            setSickLeaveStart={setSickLeaveStart}
            sickLeaveEnd={sickLeaveEnd}
            setSickLeaveEnd={setSickLeaveEnd}
          />
        )}
        {entryType === "Hospital" && (
          <HospitalForm
            dischargeDate={dischargeDate}
            setDischargeDate={setDischargeDate}
            dischargeCriteria={dischargeCriteria}
            setDischargeCriteria={setDischargeCriteria}
          />
        )}
        <button type="submit">Add Entry</button>
      </form>
    </div>
  );
};

export default NewEntryForm;

interface HealthCheckFormProps {
  healthCheckRating: number;
  setHealthCheckRating: (rating: number) => void;
}

const HealthCheckForm = ({
  healthCheckRating,
  setHealthCheckRating,
}: HealthCheckFormProps) => {
  return (
    <>
      <TextField
        id="health-check-rating-input"
        label="Health Check Rating (0 - 3)"
        variant="standard"
        required
        value={healthCheckRating}
        onChange={(e) => setHealthCheckRating(Number(e.target.value))}
        error={healthCheckRating < 0 || healthCheckRating > 3}
      />
    </>
  );
};

interface OccupationalHealthcareFormProps {
  employerName: string;
  setEmployerName: (name: string) => void;
  sickLeaveStart: string;
  setSickLeaveStart: (date: string) => void;
  sickLeaveEnd: string;
  setSickLeaveEnd: (date: string) => void;
}

const OccupationalHealthcareForm = ({
  employerName,
  setEmployerName,
  sickLeaveStart,
  setSickLeaveStart,
  sickLeaveEnd,
  setSickLeaveEnd,
}: OccupationalHealthcareFormProps) => {
  return (
    <>
      <TextField
        id="employer-name-input"
        label="Employer Name"
        variant="standard"
        required
        value={employerName}
        onChange={(e) => setEmployerName(e.target.value)}
      />
      <TextField
        id="sick-leave-start-input"
        label="Sick Leave Start Date"
        variant="standard"
        value={sickLeaveStart}
        onChange={(e) => setSickLeaveStart(e.target.value)}
      />
      <TextField
        id="sick-leave-end-input"
        label="Sick Leave End Date"
        variant="standard"
        value={sickLeaveEnd}
        onChange={(e) => setSickLeaveEnd(e.target.value)}
      />
    </>
  );
};

interface HospitalFormProps {
  dischargeDate: string;
  setDischargeDate: (date: string) => void;
  dischargeCriteria: string;
  setDischargeCriteria: (criteria: string) => void;
}

const HospitalForm = ({
  dischargeDate,
  setDischargeDate,
  dischargeCriteria,
  setDischargeCriteria,
}: HospitalFormProps) => {
  return (
    <>
      <TextField
        id="discharge-date-input"
        label="Discharge Date"
        variant="standard"
        required
        value={dischargeDate}
        onChange={(e) => setDischargeDate(e.target.value)}
      />
      <TextField
        id="discharge-criteria-input"
        label="Discharge Criteria"
        variant="standard"
        required
        value={dischargeCriteria}
        onChange={(e) => setDischargeCriteria(e.target.value)}
      />
    </>
  );
};
