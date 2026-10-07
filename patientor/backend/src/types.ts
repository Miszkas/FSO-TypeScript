import { z } from "zod";

export type Diagnoses = {
  code: string;
  name: string;
  latin?: string;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {
}

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[]
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

export const Gender = {
    Male: "male", 
    Female: 'female',
    Other: 'other'
} as const;
export type Gender = (typeof Gender)[keyof typeof Gender]

export const NewPatientSchema = z.object({
    name: z.string().min(1),
    dateOfBirth: z.iso.date(),
    ssn: z.string().min(1),
    gender: z.enum(Gender),
    occupation: z.string().min(1)
})

export type NewPatient = z.infer<typeof NewPatientSchema>;
