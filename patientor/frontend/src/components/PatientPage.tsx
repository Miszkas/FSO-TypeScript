import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import PatientService from "../services/patients";
import { Patient, Diagnosis } from "../types";
import EntryDetails from "./EntryDetails";

interface Props {
  diagnoses: Diagnosis[];
}

const PatientPage = ({ diagnoses }: Props) => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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
    </div>
  );
};

export default PatientPage;
