import * as React from "react";
import TextField from "@material-ui/core/TextField";

const renderField = ({
  label,
  input,
  type,
  meta: { touched, invalid, error },
  ...custom
}) => {
  switch (type) {
    case "text":
      return (
        <TextField
          fullWidth
          label={label}
          type={type}
          InputLabelProps={{ shrink: true }}
          error={touched && invalid}
          helperText={touched && error}
          {...input}
          {...custom}
        />
      );
    case "date":
      return (
        <TextField
          fullWidth
          margin="dense"
          InputLabelProps={{ shrink: true }}
          label={label}
          type={type}
          error={touched && invalid}
          helperText={touched && error}
          {...input}
          {...custom}
        />
      );
  }
};

export default renderField;
