// components/FormTextField.js
import { TextField } from "@mui/material";
import { useField } from "formik";

const FormTextField = ({ name, ...props }) => {
  const [field, meta] = useField(name);

  return (
    <TextField
      {...field}
      {...props}
      error={meta.touched && !!meta.error}
      helperText={meta.touched && meta.error}
      fullWidth
    />
  );
};

export default FormTextField;
