// components/FormSelect.js
import { MenuItem, InputLabel, FormControl, Select } from "@mui/material";
import { useField } from "formik";

const FormSelect = ({ name, label, options }) => {
  const [field, meta] = useField(name);

  return (
    <FormControl fullWidth error={meta.touched && !!meta.error}>
      <InputLabel>{label}</InputLabel>
      <Select {...field} label={label}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FormSelect;
