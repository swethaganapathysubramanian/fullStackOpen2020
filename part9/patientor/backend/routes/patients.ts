/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientService from '../services/patientService';
import { toNewPatient, toCheckHCEntry, toCheckHEntry, toCheckOHCEntry } from '../utils/utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getNonSensitivePatients());
});

router.post('/', (req, res) => {
    try{
    const newPatient = toNewPatient(req.body);
    const savedData = patientService.addNewPatient(newPatient);
    console.log(savedData);
    res.json(savedData);
    } catch (e) {
        res.status(404).send(e);
    }
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const searchedPatient = patientService.getSinglePatientData(id);
    if(searchedPatient){
    console.log(searchedPatient.entries);
    res.json(searchedPatient);
    } else {
        res.status(404).send('Patient not found. id unavailable');
    }
});

router.post('/:id/entries', (req, res) => {
    const patientId = req.params.id;
    const searchedPatient = patientService.getSinglePatientData(patientId);
    if (searchedPatient) {
        console.log(searchedPatient.entries);
        const entries = req.body;
        console.log(entries);
        const type = entries.type;
        if (type === 'HealthCheck') {
            try{
            toCheckHCEntry(entries);
            } catch(e){
                res.status(404).send(e);
            }
        } else if ( type === 'Hospital') {
            try{
            toCheckHEntry(entries);
            } catch (e) {
                res.status(404).send(e);
            }
        } else {
            try{
            toCheckOHCEntry(entries);
            } catch (e) {
                res.status(404).send(e);
            }
        }

        const result = patientService.addEntryValues(patientId, entries);
        res.json(result);
    } else {
        res.status(404).send('Patient not found. id unavailable');
    }
});
export default router;