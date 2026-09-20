import {Gender, type NewPatient} from './types.ts';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
}

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect type of name: ' + name)
    }
    return name
}

const isDate = (date: string): boolean => {
  return !isNaN(Date.parse(date))
}

function parseDateOfBirth(date: unknown): string {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect type of dateOfBirth: ' + date);
    }
    return date;
}

const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect type of ssn: ' + ssn)
    }
    return ssn
}

const isGender = (param: string): param is Gender => {
    return (Object.values(Gender) as string[]).includes(param)
}

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect type of gender: ' + gender)
    }
    return gender
}

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect type of occupation: ' + occupation)
    }
    return occupation
}

const parseNewPatient = (object: unknown): NewPatient => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data: ' + object);
    }

    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
        const newPatient: NewPatient = {
            name: parseName(object.name),
            dateOfBirth: parseDateOfBirth(object.dateOfBirth),
            ssn: parseSsn(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation),
        };
        return newPatient;
    }

    throw new Error('Missing required fields');
}

export default parseNewPatient