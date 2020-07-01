import { newPatient, Gender, HealthCheckRating,  newHealthCheckEntry, newOccupationalHealthCareEntry, newHospitalEntry, DischargeType } from '../types';

export const toNewPatient = (object: any): newPatient => 
    ({
        name: parseValue("name", object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseValue("ssn", object.ssn),
        gender: parseGender(object.gender),
        occupation:parseValue("occupation", object.occupation)
    });


const parseValue = (name: string ,value: any): string => {
    if (!value || !isString(value)) {
        throw `Incorrect or missing value: ${name}`;
    }
    return value;
};

const parseDate = (date: any): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw `Incorrect or missing date: ${date}`;
    }
    return date;
};

const parseGender = (gender: any): Gender => {
    if (!gender || !isGender(gender)) {
        throw `Incorrect or missing gender: ${gender}`
;    }
    return gender;
};

const parseRating = (rating: any): HealthCheckRating => {
    if (!isHealthCheckRating(rating)) {
        console.log(isHealthCheckRating(rating));
        throw `Incorrect or missing rating: ${rating}`;
    }
    return rating;
};

const parseDischarge = (discharge: any): DischargeType => {
    const disDate = parseDate(discharge.date);
    const disCriteria = parseValue("disCriteria", discharge.criteria);
    if ( !disDate || !disCriteria ){
        throw new Error('Incorrect or missing Discharge Details: ' + discharge);
    }
};

const isDate = (date: string): boolean => {
    if (isNaN(Number(date)) && !isNaN(Date.parse(date)))
        return true;
    else return false;
};

const isString = (text: any): text is string =>
    typeof text === 'string' || text instanceof String;

const isGender = (param: any): param is Gender =>
    Object.values(Gender).includes(param);

const isHealthCheckRating = (param: any): param is HealthCheckRating =>
    Object.values(HealthCheckRating).includes(param);


export const toCheckHCEntry = (object: any): newHealthCheckEntry => ({
    healthCheckRating: parseRating(object.healthCheckRating),
    //id: parseValue("id", object.id),
    description: parseValue("desc", object.description),
    date: parseDate(object.date),
    specialist: parseValue("specialist", object.specialist),
    type: "HealthCheck"
});

export const toCheckOHCEntry = (object: any): newOccupationalHealthCareEntry => ({
    //id: parseValue("id", object.id),
    description: parseValue("desc", object.description),
    date: parseDate(object.date),
    specialist: parseValue("specialist", object.specialist),
    type: "OccupationalHealthcare",
    employerName: parseValue("employer name", object.employerName)
});

export const toCheckHEntry = (object: any): newHospitalEntry => ({
    //id: parseValue("id", object.id),
    description: parseValue("desc", object.description),
    date: parseDate(object.date),
    specialist: parseValue("specialist", object.specialist),
    type: "Hospital",
    discharge: parseDischarge(object.discharge)
});