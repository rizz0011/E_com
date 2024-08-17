import { TextField } from "@mui/material";
import React from "react";

function InputAddField({ fields, idx, formData, setFormData }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <TextField
      key={idx}
      sx={{ mt: 1 }}
      label={fields.label}
      type={fields?.inType ? fields?.inType : ''}
      name={fields.name}
      variant="outlined"
      fullWidth
      size="small"
      value={formData[fields.name]}
      onChange={handleInputChange}
    />
  );
}

export default InputAddField;
