import { patientsData } from '../../data/patients.ts';
import type { PatientWithoutSsn, NewPatient, Patient } from '../types.ts';
import { v4 as uuidv4 } from 'uuid';

const getPatientsWithoutSsn = (): PatientWithoutSsn[] => {
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
    id: uuidv4(),
    ...patient,
  }
  patientsData.push(newPatient);
  return newPatient;
};

export default { getPatientsWithoutSsn, addPatient };