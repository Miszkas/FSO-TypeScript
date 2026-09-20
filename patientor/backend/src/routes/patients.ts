import express,  { type Request, type Response } from 'express';
import patientsService from '../services/patientsService.ts';
import type { PatientWithoutSsn, NewPatient, PatientEntry } from '../types.ts';
import {newPatientParser, errorMiddleware} from '../middleware.ts';

const router = express.Router();

router.get('/', (_req, res: Response<PatientWithoutSsn[]>) => {
    res.send(patientsService.getPatientsWithoutSsn());
})

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<PatientEntry>) => {
    const newPatient = patientsService.addPatient(req.body);
    res.json(newPatient);
})

router.use(errorMiddleware);

export default router;