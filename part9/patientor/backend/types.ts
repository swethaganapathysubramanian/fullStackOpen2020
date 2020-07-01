export interface DiagnoseEntry {
    code: string;
    name: string;
    latin?: string;
}

export interface DischargeType {
    date: string;
    criteria: string;
}
export interface SickLeave {
    startDate: string;
    endDate: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<DiagnoseEntry['code']>;
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

export interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}


export interface OccupationalHealthCareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: SickLeave;
}

export interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: DischargeType;
}

export type Entry =
    | HospitalEntry
    | OccupationalHealthCareEntry
    | HealthCheckEntry;

export interface patientsList {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    entries: Entry[];
    occupation:string;
}

export enum Gender {
    male = "male",
    female = "female",
    other = "other"

}

export type PublicPatient = Omit<patientsList, 'ssn' | 'entries'>;

export type SecuredPatients = Omit<patientsList, 'ssn' >;

export type newPatient  = Omit<patientsList,'id'>;

export type newEntry = Omit<Entry, "id">;

export type newHealthCheckEntry = Omit <HealthCheckEntry, "id">;

export type newOccupationalHealthCareEntry = Omit<OccupationalHealthCareEntry, "id">;

export type newHospitalEntry = Omit<HospitalEntry, "id">;