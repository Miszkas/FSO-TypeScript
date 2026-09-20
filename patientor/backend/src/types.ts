export type Diagnoses = {
  code: string;
  name: string;
  latin?: string;
};

export type Patient = {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
};

export const Gender = {
    Male: "male", 
    Female: 'female',
    Other: 'other'
} as const;
export type Gender = (typeof Gender)[keyof typeof Gender]

export type PatientWithoutSsn = Omit<Patient, "ssn">;

export type NewPatient = Omit<Patient, "id">;