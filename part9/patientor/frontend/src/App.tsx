import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";

import { apiBaseUrl } from "./constants";
import { useStateValue, setPatientList, setDiagnosisList } from "./state";
import { Patient, Diagnosis } from "./types";

import PatientListPage from "./PatientListPage";
import PatientPage from "./PatientListPage/PatientPage";

const App: React.FC = () => {
  const [, dispatch] = useStateValue();
  React.useEffect(() => {
    axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const response = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);
        const patientListFromApi  = response.data;      
       
       // console.log(patientListFromApi);
        //dispatch({ type: "SET_PATIENT_LIST", payload: patientListFromApi });
        dispatch(setPatientList(patientListFromApi));
        const diagnosisResponse = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
        dispatch(setDiagnosisList(diagnosisResponse.data));
      } catch (e) {
        console.error(e);
      }
    };
    fetchPatientList();
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Container>
          <Header as="h1">Patientor</Header>
          <Button as={Link} to="/" primary>
            Home
          </Button>
          <Divider hidden />
          <Switch>
            <Route path="/patients/:id" render={() => <PatientPage />} />
            <Route path="/" render={() => <PatientListPage />} /> 
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App;
