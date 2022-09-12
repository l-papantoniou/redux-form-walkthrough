import * as React from "react";
import TextField from "@material-ui/core/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { FormControl, FormControlLabel, FormLabel } from "@material-ui/core";

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
          required
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
          required
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

    // case "radios":
    //   return (
    //     <FormControl>
    //       <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel>
    //       <RadioGroup
    //         aria-labelledby="demo-controlled-radio-buttons-group"
    //         name="controlled-radio-buttons-group"
    //       >
    //         <FormControlLabel
    //           value="female"
    //           control={<Radio />}
    //           label="Female"
    //         />
    //         <FormControlLabel value="male" control={<Radio />} label="Male" />
    //       </RadioGroup>
    //     </FormControl>
    //   );
  }
};

export default renderField;
