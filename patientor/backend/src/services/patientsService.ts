import patients from "../../data/patients.ts";
import type {
  NonSensitivePatient,
  NewPatient,
  Patient,
  Entry,
  NewEntry,
} from "../types.ts";
import { v4 as uuidv4 } from "uuid";

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    ...patient,
    id: uuidv4(),
    entries: [],
  };
  patients.push(newPatient);
  return newPatient;
};

const getPatientById = (id: string): Patient | undefined => {
  return patients.find((patient) => patient.id === id);
};

const addEntryToPatient = (patient: Patient, entry: NewEntry): Entry => {
  const newEntry = {
    ...entry,
    id: uuidv4(),
  };
  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getNonSensitivePatients,
  addPatient,
  getPatientById,
  addEntryToPatient,
};
