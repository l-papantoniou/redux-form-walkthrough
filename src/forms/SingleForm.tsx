import React, { Fragment, useState } from "react";
import { useDispatch, connect } from "react-redux";
import { Field, reduxForm, InjectedFormProps } from "redux-form";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import {
  createEmployee,
  employeeActions,
  updateEmployee,
} from "../reducers/EmployeeReducer";
import mapStateToProps from "../initialValues/InitialState";
import renderField from "./TextField";
import { EmployeeInterface } from "../interfaces/EmpoyeeInterface";
import type {} from "redux-thunk/extend-redux";

interface IRootState {
  employees?: any;
  id?: number | string | null;
  isNew?: boolean;
}

export type FormValues = { [key: string]: any };

export const ReduxForm: React.FC<
  IRootState & InjectedFormProps<FormValues, IRootState>
> = (props) => {
  const { handleSubmit, pristine, submitting, onSubmit, schema } = props;

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(employeeActions.clearUpdateEmployee());
    navigate("/");
  };

  return (
    <Fragment>
      <Dialog open fullWidth>
        <DialogTitle>ΕΓΓΡΑΦΗ/ΕΝΗΜΕΡΩΣΗ</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Εισάγετε τα στοιχεία του υπαλλήλου:
          </DialogContentText>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {schema.elements.map((element) => (
                <Field
                  label={element.label}
                  name={element.name}
                  type={element.type}
                  component={renderField}
                />
              ))}
            </div>

            {errorMessage && (
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                <strong> {errorMessage} </strong>
              </Alert>
            )}
            <DialogActions>
              <Button onClick={() => handleClose()}>ΕΞΟΔΟΣ</Button>
              <Button disabled={pristine || submitting} type="submit">
                ΕΓΓΡΑΦΗ
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export const SingleForm = (name: string) =>
  (connect(mapStateToProps) as any)(
    reduxForm<{}, IRootState>({
      form: name,
      destroyOnUnmount: true,
      enableReinitialize: true,
    })(ReduxForm)
  );
