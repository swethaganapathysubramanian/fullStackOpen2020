import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStateValue, getPatient } from "../state";
import { Patient, Entry } from "../types";
import { Icon, Button } from 'semantic-ui-react';
import { apiBaseUrl } from "../constants";
import axios from "axios";
import Entries from "./Entries";
import AddEntryForm from "../AddEntryForm";
//import { PatientEntries } from "../AddEntryForm/AddEntryForm";
import AddHospitalEntryForm from "../AddHospitalEntryForm";
import AddOHCEntryForm from "../AddOHCEntryForm";

export type PatientEntries = Omit<Entry, "id">;

const PatientPage: React.FC = () => {


    const { id } = useParams<{ id: string }>();
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();
    const [hospitalModalOpen, setHospitalModalOpen] = React.useState<boolean>(false);
    const [OHCmodalOpen, setOHCModalOpen] = React.useState<boolean>(false);

    const openModal = (): void => setModalOpen(true);
    const openHospitalModal = (): void => setHospitalModalOpen(true);
    const openOHCModal = (): void => setOHCModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setHospitalModalOpen(false);
        setOHCModalOpen(false);
        setError(undefined);
    };

    //console.log(id);
    const [{ patients }, dispatch] = useStateValue();
   
    const [patient, setPatient] = React.useState< Patient | undefined>(patients[id]);
    useEffect(() => {
        if (patient && !patient.ssn) {
            const fetchSingleData = async () => {
                try {
                    const { data: newPatient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
                   // console.log('new:',newPatient);
                    dispatch(getPatient(newPatient));
                    setPatient(newPatient);
                } catch (e) {
                    console.error(e.response.data);
                    setError(e.response.data.error);
                }
            };
            fetchSingleData();
        }
    }, [patient]);

    if(!patient){
        //console.log(patient);
        const fetchPatientList = async () => {
      try {
        const response = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);
        const patientListFromApi  = response.data; 
        //console.log(patientListFromApi);
        setPatient(patientListFromApi.find(patient => patient.id === id));
      } catch (e) {
        console.error(e);
      }
    };
    fetchPatientList();
    }

    //console.log('final', patient);
    const icon = patient? patient.gender === 'female' ? 'venus' : patient.gender === 'male' ? 'mars' : 'genderless' : 'help';

    const submitNewEntry = async (values: PatientEntries) => {
        console.log(values);
        try {
            const { data: AddedPatient } = await axios.post<Patient>(
                `${apiBaseUrl}/patients/${id}/entries`,
                values
            );
            console.log(AddedPatient);
            dispatch(getPatient(AddedPatient));
            setPatient(AddedPatient);
            closeModal();
        } catch (e) {
            console.error(e.response.data);
            setError(e.response.data);
            console.log(error);
        }
    };


    if(patient){
    return (
        <div>
            <h2>{patient.name} <Icon name= {icon} /></h2>
            <p>ssn: {patient.ssn}</p>
            <p>occupation: {patient.occupation}</p>
            <p>Date of Birth: {patient.dateOfBirth}</p>
            {patient.entries[0] ?
            <>
            <p>Entries: </p>
            {patient.entries.map(patientEntry => <Entries key={patientEntry.id} patientEntry = {patientEntry} />)}
             </>
            :<div>
            No Entries Yet
             </div>   
            } 
            <br /> <br />
            <AddEntryForm
                modalOpen={modalOpen}
                onSubmit={submitNewEntry}
                error={error}
                onClose={closeModal}
            />
            <AddHospitalEntryForm
                modalOpen={hospitalModalOpen}
                onSubmit={submitNewEntry}
                error={error}
                onClose={closeModal}
            />
            <AddOHCEntryForm
                modalOpen={OHCmodalOpen}
                onSubmit={submitNewEntry}
                error={error}
                onClose={closeModal}
            />
            <Button onClick={() => openModal()}>Add New Health Check Entry</Button> &nbsp;
            <Button onClick={() => openHospitalModal()}>Add New Hospital Entry</Button> &nbsp;
            <Button onClick={() => openOHCModal()}>Add New Occupational Health Care Entry</Button>
        </div>
    );
    }
    else{
        return(
            <div> Unsafe to Reload Patient Data. Please go back. </div>
        );
    }
};

export default PatientPage;