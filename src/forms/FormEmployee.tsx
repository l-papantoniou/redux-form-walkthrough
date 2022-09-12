import React from "react";
import { SimpleForm } from "./SimpleForm";

const FormEmployee = (props) => {
  const { schema, id, onSubmit } = props;

  return (
    <SimpleForm
      id={id}
      onSubmit={onSubmit}
      name={schema.name}
      schema={schema}
    ></SimpleForm>
  );
};

export default FormEmployee;
