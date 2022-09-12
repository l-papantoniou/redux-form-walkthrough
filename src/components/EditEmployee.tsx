import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "../forms/SingleForm";
import SimpleFormSchema from "../forms/SimpleFormSchema";
import {
  employeeActions,
  loadEmployee,
  updateEmployee,
} from "../reducers/EmployeeReducer";
import FormEmployee from "../forms/FormEmployee";
import { EmployeeInterface } from "../interfaces/EmpoyeeInterface";

export const EditEmployee = (setAuth) => {
  const [errorMessage, setErrorMessage] = useState("");

  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //useEffect
  useEffect(() => {
    if (params.id) {
      dispatch(loadEmployee(params.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  const onSubmitForm = async (entity: EmployeeInterface) => {
    try {
      const response: any = await dispatch(
        updateEmployee({ ...entity, id: params.id })
      );
      console.log(response.payload.data);
      if (
        response.payload.data === "Λάθος ΑΦΜ" ||
        response.payload.data ===
          'duplicate key value violates unique constraint "employees_afm_key"'
      ) {
        setErrorMessage("Λάθος ΑΦΜ!");
        throw Error();
      }
      dispatch(employeeActions.clearUpdateEmployee());
      navigate("/");
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <FormEmployee
      onSubmit={onSubmitForm}
      schema={SimpleFormSchema}
      errorMessage={errorMessage}
      id={params.id}
    />
  );
};

export default EditEmployee;
