import express,  { type Request, type Response } from 'express';
import patientsService from '../services/patientsService.ts';
import type { NonSensitivePatient, NewPatient, Patient } from '../types.ts';
import {newPatientParser, errorMiddleware} from '../middleware.ts';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
    res.send(patientsService.getNonSensitivePatients());
})

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
    const newPatient = patientsService.addPatient(req.body);
    res.json(newPatient);
})

router.get('/:id', (req: Request<{ id: string }>, res: Response<Patient | { error: string }>) => {
    const patient = patientsService.getPatientById(req.params.id);
    if (patient) {
        res.json(patient);
    } else {
        res.status(404).json({ error: 'Patient not found' });
    }
});

router.use(errorMiddleware);

export default router;