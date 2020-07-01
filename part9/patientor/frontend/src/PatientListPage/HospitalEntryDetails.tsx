
import React from "react";

import { HospitalEntry } from "../types";


const HospitalEntryDetails: React.FC<{ patientEntry: HospitalEntry }> = ({ patientEntry }) => {
    
    return (
        <div>
            Discharge Date: {patientEntry.discharge.date} <br/> <br/>
            Discharge Criteria: {patientEntry.discharge.criteria}
        </div> 
    );
};

export default HospitalEntryDetails;