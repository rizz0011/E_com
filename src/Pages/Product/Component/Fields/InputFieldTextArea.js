import React from "react";
import { TextareaAutosize } from "@mui/material";

function InputFieldTextArea({ fields, idx, formData, setFormData }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <TextareaAutosize
      style={{ marginTop: "10px", width: "99%" }}
      key={idx}
      minRows={4}
      placeholder={fields.label}
      name={fields.name}
      value={formData[fields.name]}
      onChange={handleInputChange}
    />
  );
}

export default InputFieldTextArea;
