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
import renderTextField from "./TextField";
import { EmployeeInterface } from "../interfaces/EmpoyeeInterface";
import type {} from "redux-thunk/extend-redux";

interface IRootState {
  employees?: any;
  id?: number | string | null;
  isNew?: boolean;
}

export type FormValues = { [key: string]: any };

export const SimpleForm: React.FC<
  IRootState & InjectedFormProps<FormValues, IRootState>
> = (props) => {
  const { handleSubmit, pristine, submitting, id, isNew } = props;

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmitForm = async (entity: EmployeeInterface) => {
    try {
      if (!isNew) {
        const response: any = await dispatch(
          updateEmployee({ ...entity, id: id })
        );
        if (
          response.payload.data === "Λάθος ΑΦΜ" ||
          response.payload.data ===
            'duplicate key value violates unique constraint "employees_afm_key"'
        ) {
          setErrorMessage("Λάθος ΑΦΜ!");
          throw Error();
        }
      } else {
        const response: any = await dispatch(createEmployee(entity));
        if (
          response.payload.data === "Λάθος ΑΦΜ" ||
          response.payload.data ===
            'duplicate key value violates unique constraint "employees_afm_key"'
        ) {
          setErrorMessage("Λάθος ΑΦΜ!");
          throw Error();
        }
      }
      navigate("/");
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleClose = () => {
    dispatch(employeeActions.clearUpdateEmployee());
    navigate("/");
  };

  return (
    <Fragment>
      <Dialog open>
        <DialogTitle>ΕΓΓΡΑΦΗ/ΕΝΗΜΕΡΩΣΗ</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Εισάγετε τα στοιχεία του υπαλλήλου.
          </DialogContentText>
          <form onSubmit={handleSubmit(onSubmitForm)}>
            <div>
              <label>Όνομα</label>
              <div>
                <Field
                  required
                  id="firstName"
                  name="firstName"
                  component={renderTextField}
                  type="text"
                  placeholder="Όνομα"
                />
              </div>
            </div>
            <div>
              <label>Επώνυμο</label>
              <div>
                <Field
                  required
                  id="lastName"
                  name="lastName"
                  component={renderTextField}
                  type="text"
                  placeholder="Επώνυμο"
                />
              </div>
            </div>
            <label>Ημερομηνία Γέννησης</label>
            <div>
              <Field
                name="birthDate"
                id="birthDate"
                component={renderTextField}
                type="date"
                placeholder="Ημερομηνία Γέννησης"
              />
            </div>
            <div>
              <label>ΑΦΜ</label>
              <div>
                <Field
                  required
                  name="afm"
                  id="afm"
                  component={renderTextField}
                  type="text"
                  placeholder="ΑΦΜ"
                />
              </div>
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

export default (connect(mapStateToProps) as any)(
  reduxForm<{}, IRootState>({
    form: "simple",
    destroyOnUnmount: true,
    enableReinitialize: true,
  })(SimpleForm)
);
