import { patientsData } from '../../data/patients.ts';
import type { NonSensitivePatient, NewPatient, Patient } from '../types.ts';
import { v4 as uuidv4 } from 'uuid';

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
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
    entries: []
  }
  patientsData.push(newPatient);
  return newPatient;
};

const getPatientById = (id: string): Patient | undefined => {
  return patientsData.find(patient => patient.id === id);
};

export default { getNonSensitivePatients, addPatient, getPatientById };