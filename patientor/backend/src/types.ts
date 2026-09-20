import { z } from "zod";

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

export const NewPatientSchema = z.object({
    name: z.string().min(1),
    dateOfBirth: z.iso.date(),
    ssn: z.string().min(1),
    gender: z.enum(Gender),
    occupation: z.string().min(1)
})

export type NewPatient = z.infer<typeof NewPatientSchema>;

export interface PatientEntry extends NewPatient {
    id: string
}