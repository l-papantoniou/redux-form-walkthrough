import React from "react";

import "../forms/SimpleForm";
import SimpleForm from "../forms/SimpleForm";
import SimpleFormSchema from "../forms/SimpleFormSchema";

const InputEmployee = (setAuth) => {
  return <SimpleForm schema={SimpleFormSchema} isNew={true} />;
};

export default InputEmployee;
