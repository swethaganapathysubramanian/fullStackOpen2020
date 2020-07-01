import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { OccupationalHealthCareEntry } from "../types";
import { useStateValue } from "../state";


export type PatientEntries = Omit<OccupationalHealthCareEntry, "id">;

interface Props {
    onCancel: () => void;
    onSubmit: (values: PatientEntries) => void;
}


const AddOHCEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
    const [{ diagnoses }] = useStateValue();

    return (
        <Formik
            initialValues={{
                type: "OccupationalHealthcare",
                description: "",
                specialist: "",
                date: "",
                employerName: "",
                sickLeave:{startDate:"", endDate:""},
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
                if (!values.employerName) {
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
                        label="Employer Name"
                        placeholder="Employer Name"
                        name="employerName"
                        component={TextField}
                    />
                    <Field
                        label="Sick Leave Start Date"
                        placeholder="Sick Leave Start Date(Optional)"
                        name="sickLeave.startDate"
                        component={TextField}
                    />
                    <Field
                        label="Sick Leave End Date"
                        placeholder="Sick Leave End Date(Optional)"
                        name="sickLeave.endDate"
                        component={TextField}
                    />
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

export default AddOHCEntryForm;