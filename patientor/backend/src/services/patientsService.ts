import { patientsData, type PatientWithoutSsn } from "../../data/patients.ts";

export const getPatientsWithoutSsn = (): PatientWithoutSsn[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};
