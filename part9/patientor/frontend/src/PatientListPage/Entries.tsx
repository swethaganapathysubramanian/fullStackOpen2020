import React from "react";
import { useStateValue } from "../state";
import { Entry } from "../types";
import HospitalEntry from "./HospitalEntryDetails";
import HealthCheckEntry from "./HealthCheckEntryDetails";
import OccupationalHealthCareEntry from "./OccupationalHealthCareEntryDetails";
import { assertNever } from "../utils";
import { Icon } from "semantic-ui-react";
import { Segment } from 'semantic-ui-react';

const Entries: React.FC<{patientEntry: Entry}> = ({ patientEntry }) => {

    const [{diagnoses}] = useStateValue();
    
    const icon = patientEntry.type === "Hospital" ? 'user md' : patientEntry.type === 'HealthCheck' ? 'heartbeat' : 'stethoscope' ;


    const specificEntryDetails = () =>{
    switch(patientEntry.type){
        case "Hospital":
            //icon = 'user md';
            return <HospitalEntry patientEntry = {patientEntry}/>;
        case "HealthCheck":
            //icon = 'heartbeat';
            return <HealthCheckEntry patientEntry={patientEntry} />;
        case "OccupationalHealthcare":
            //icon = 'stethoscope';
            return <OccupationalHealthCareEntry patientEntry={patientEntry} />;
        default:
            assertNever(patientEntry);
    }
    };

    const diagnosisDetails = (code: string) => {
        const details = diagnoses.find(diagnosis => code === diagnosis.code);
        console.log('call');
        if (details) {
            return details.name;
        }
        return "No details";
    };

    return(
        <div>
            <Segment raised>
            <p>{patientEntry.date} <Icon name={icon}  size='large' /> </p>
            <p>{ patientEntry.description } </p>
            <p> Specialist: <Icon name="doctor" circular color='teal' /> {patientEntry.specialist} </p>
            <p> {patientEntry.diagnosisCodes ? patientEntry.diagnosisCodes.map((value: string) => <li key={value} > { diagnosisDetails(value) } </li>) : <></> } </p>
             {specificEntryDetails()} 
            </Segment>
            <div> </div>
            <div> </div>
        </div>
    );
};

export default Entries;