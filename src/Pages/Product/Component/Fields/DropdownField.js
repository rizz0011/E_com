import { Select, FormControl, InputLabel, MenuItem } from "@mui/material";
import React from "react";

function DropdownField({ fields, idx, formData, setFormData }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <FormControl fullWidth sx={{ mt: 1 }} key={idx}>
      <InputLabel>{fields?.label}</InputLabel>
      <Select
        name={fields?.name}
        size="small"
        value={formData[fields?.name]}
        onChange={handleInputChange}
        label={fields?.label}
      >
        {fields?.data?.map((item, i) => (
          <MenuItem key={i} value={item?.id}>
            {item?.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default DropdownField;
