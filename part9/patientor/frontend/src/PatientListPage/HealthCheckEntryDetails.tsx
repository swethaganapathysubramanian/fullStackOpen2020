
import React from "react";
import { HealthCheckEntry } from "../types";
import { Icon } from "semantic-ui-react";

const HealthCheckEntryDetails: React.FC<{ patientEntry: HealthCheckEntry }> = ({ patientEntry }) => {

    const setRating = () => {
        switch (patientEntry.healthCheckRating){
            case 3:
                return "red";
            case 2:
                return "orange";
            case 1:
                return "yellow";
            case 0:
                return "green";
        }
    };
    
    return (
        <div>
            <Icon name= "heart" color = {setRating()} />
        </div>
    );
};

export default HealthCheckEntryDetails;