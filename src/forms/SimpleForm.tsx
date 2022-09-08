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
import SimpleFormSchema from "./SimpleFormSchema";
import { ISchema } from "../interfaces/IschemaInterface";

interface IRootState {
  employees?: any;
  id?: number | string | null;
  isNew?: boolean;
}

export type FormValues = { [key: string]: any };

export const SimpleForm: React.FC<
  IRootState & InjectedFormProps<FormValues, IRootState>
> = (props) => {
  const { handleSubmit, pristine, submitting, id, isNew, schema } = props;

  console.log(schema);
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
      <Dialog open fullWidth>
        <DialogTitle>ΕΓΓΡΑΦΗ/ΕΝΗΜΕΡΩΣΗ</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Εισάγετε τα στοιχεία του υπαλλήλου:
          </DialogContentText>
          <form onSubmit={handleSubmit(onSubmitForm)}>
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

export default (connect(mapStateToProps) as any)(
  reduxForm<{}, IRootState>({
    form: "simple",
    destroyOnUnmount: true,
    enableReinitialize: true,
  })(SimpleForm)
);
