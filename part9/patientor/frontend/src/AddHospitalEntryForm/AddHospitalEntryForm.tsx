import React, { useState } from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { HealthCheckEntry, HospitalEntry } from "../types";
import { useStateValue } from "../state";
//import { NumberField } from "../AddPatientModal/FormField";


export type PatientEntries = Omit<HospitalEntry, "id">;

interface Props {
    onCancel: () => void;
    onSubmit: (values: PatientEntries) => void;
}


const AddHospitalEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
    const [{ diagnoses }] = useStateValue();
    const [dischargedate, setDischargeDate] = useState("2017-06-01");
    console.log(dischargedate);
    return (
        <Formik
            initialValues={{
                type: "Hospital",
                description: "",
                specialist: "",
                date: "",
                discharge: {criteria: "", date: ""},
                diagnosisCodes: []
            }}
            onSubmit={onSubmit}
            validate={values => {
                const requiredError = "Field is required";
                const errors: { [field: string]: string } = {};
                if (!values.description) {
                    errors.description = requiredError;
                }
                if (!values.specialist) {
                    errors.specialist = requiredError;
                }
                if (!values.date) {
                    errors.date = requiredError;
                }
                return errors;
            }}
        >
            {({ isValid, dirty, setFieldValue, setFieldTouched }) => {

                return (
                  <Form className="form ui">
                    <Field
                        label="Description"
                        placeholder="Description"
                        name="description"
                        component={TextField}
                    />
                    <Field
                        label="Date"
                        placeholder="YYYY-MM-DD"
                        name="date"
                        component={TextField}
                    />
                    <Field
                        label="Specialist"
                        placeholder="Specialist"
                        name="specialist"
                        component={TextField}
                    />
                    <DiagnosisSelection
                        setFieldValue={setFieldValue}
                        setFieldTouched={setFieldTouched}
                        diagnoses={Object.values(diagnoses)}
                    />
                   <Field
                        label="Discharge Date"
                        placeholder="YYYY-MM-DD"
                        name="discharge.date"
                        component={TextField}
                    />
                    <Field
                        label="Discharge Criteria"
                        placeholder="Discharge Criteria"
                        name="discharge.criteria"
                        component={TextField}
                    />
                    {/* <Field 
                        label = "Select Discharge Date"
                        date={dischargedate}
                        name = "discharge.date"
                        onChange = {setDischargeDate}
                        component = {DateField}
                    /> */}
                    <Grid>
                      <Grid.Column floated="left" width={5}>
                        <Button type="button" onClick={onCancel} color="red">
                          Cancel
                        </Button>
                      </Grid.Column>
                      <Grid.Column floated="right" width={5}>
                      <Button
                        type="submit"
                        floated="right"
                        color="green"
                        disabled={!dirty || !isValid}
                      >
                        Add
                      </Button>
                     </Grid.Column>
                    </Grid>
                  </Form>
                );
            }}
        </Formik>
    );
};

export default AddHospitalEntryForm;