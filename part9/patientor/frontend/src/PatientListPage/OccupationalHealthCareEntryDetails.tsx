
import React from "react";
import { OccupationalHealthCareEntry } from "../types";
import { Icon } from "semantic-ui-react";

const OccupationalHealthCareEntryDetails: React.FC<{ patientEntry: OccupationalHealthCareEntry }> = ({ patientEntry }) => {

    return (
        <div>
            <p><Icon name="building" size="large" /> Employer: {patientEntry.employerName} </p>
            {patientEntry.sickLeave && <p> <Icon name="thermometer three quarters" color="red" size="large" />Sick Days: { patientEntry.sickLeave.startDate} to {patientEntry.sickLeave.endDate} </p>}
        </div>
    );
};

export default OccupationalHealthCareEntryDetails;