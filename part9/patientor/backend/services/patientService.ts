import patients from '../data/patients';
import { uuid } from 'uuidv4';

import { patientsList, SecuredPatients, newPatient, Entry } from '../types';

//const patients : Array<patientsList> = patients;

//const patientsWithoutSsn: Array<SecuredPatients> = patientData as Array<SecuredPatients>;

const getPatients = () : Array<patientsList> => {
    return patients;
};

const getNonSensitivePatients = () : Array<SecuredPatients> => {
    return patients.map(({ id, name, dateOfBirth,gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));
};

const addNewPatient = (entry: newPatient) : patientsList | undefined => {
    
    const newPatientEntry = { 
        id: uuid(),
        ...entry 
    };
    patients.push(newPatientEntry);
    return newPatientEntry;
};

const addEntryValues = (patientId: string, entry: Entry) : patientsList | undefined => {
    const searchedPatient = patients.find(patient => patient.id === patientId);
    
    const newEntry = {
        id: uuid(),
        ...entry
    };
    
    searchedPatient?.entries.push(newEntry);
    console.log(searchedPatient?.entries);
    return searchedPatient;
};

const getSinglePatientData = (id: string) : patientsList | undefined => {

    const searchedPatient =  patients.find(patient => patient.id === id);
    return searchedPatient;
};

export default { addEntryValues, getPatients, getNonSensitivePatients, addNewPatient, getSinglePatientData};
