import { Entry, Diagnosis } from "../types";

import GppGoodIcon from "@mui/icons-material/GppGood";
import EmergencyIcon from "@mui/icons-material/Emergency";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import HealthRatingBar from "./HealthRatingBar";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`,
  );
};

interface DiagnoseProps {
  codes?: string[];
  diagnoses: Diagnosis[];
}

const DiagnosisList = ({ codes, diagnoses }: DiagnoseProps) => {
  if (!codes || codes.length === 0) {
    return null;
  }

  return (
    <ul>
      {codes.map((code) => {
        const diagnosis = diagnoses.find((d) => d.code === code);
        return (
          <li key={code}>
            {code} - {diagnosis ? diagnosis.name : "Undefined diagnosis"}
          </li>
        );
      })}
    </ul>
  );
};

interface Props {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const style = {
  border: "1px solid #ddd",
  borderRadius: "8px",
  padding: "12px 16px",
  marginBottom: "12px",
  backgroundColor: "#fafafa",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
};

const EntryDetails = ({ entry, diagnoses }: Props) => {
  switch (entry.type) {
    case "HealthCheck":
      return (
        <div style={style}>
          <h3>{entry.date}</h3>
          <GppGoodIcon />
          <p>{entry.description}</p>
          <DiagnosisList codes={entry.diagnosisCodes} diagnoses={diagnoses} />
          <HealthRatingBar rating={entry.healthCheckRating} showText={true} />
          <p>Specialist: {entry.specialist}</p>
        </div>
      );
    case "Hospital":
      return (
        <div style={style}>
          <h3>{entry.date}</h3>
          <EmergencyIcon />
          <p>{entry.description}</p>
          <p>Discharge date: {entry.discharge.date}</p>
          <p>Discharge criteria: {entry.discharge.criteria}</p>
          <DiagnosisList codes={entry.diagnosisCodes} diagnoses={diagnoses} />
          <p>Specialist: {entry.specialist}</p>
        </div>
      );
    case "OccupationalHealthcare":
      return (
        <div style={style}>
          <h3>{entry.date}</h3>
          <LocalHospitalIcon />
          <p>{entry.employerName}</p>
          <p>{entry.description}</p>
          {entry.sickLeave && (
            <p>
              {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
            </p>
          )}
          <DiagnosisList codes={entry.diagnosisCodes} diagnoses={diagnoses} />
          <p>Specialist: {entry.specialist}</p>
        </div>
      );
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
