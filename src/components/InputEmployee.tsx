import React, { useState } from "react";
import "../forms/SingleForm";
import SimpleFormSchema from "../forms/SimpleFormSchema";
import FormEmployee from "../forms/FormEmployee";
import { EmployeeInterface } from "../interfaces/EmpoyeeInterface";
import { createEmployee } from "../reducers/EmployeeReducer";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export const InputEmployee = (setAuth) => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmitForm = async (entity: EmployeeInterface) => {
    try {
      const response: any = await dispatch(createEmployee(entity));
      if (
        response.payload.data === "Λάθος ΑΦΜ" ||
        response.payload.data ===
          'duplicate key value violates unique constraint "employees_afm_key"'
      ) {
        setErrorMessage("Λάθος ΑΦΜ!");
        throw Error();
      }
      navigate("/");
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <FormEmployee
      schema={SimpleFormSchema}
      onSubmit={onSubmitForm}
      errorMessage={errorMessage}
    />
  );
};

export default InputEmployee;
