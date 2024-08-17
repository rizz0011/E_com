import React from "react";
import { Stack, TextField, IconButton, Chip } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

function MultiValField({ fields, idx, formData, setFormData }) {
  const [tagVal, setTagVal] = React.useState("");

  const handleAdd = () => {
    if (tagVal && !formData.tags.includes(tagVal)) {
      setFormData({ ...formData, tags: [...formData.tags, tagVal] });
      setTagVal("");
    }
  };

  const handleDelete = (tagToDelete) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToDelete),
    });
  };

  return (
    <>
      <Stack direction="row" spacing={1} sx={{ mt: 1 }} key={idx}>
        <TextField
          label="Tags"
          value={tagVal}
          onChange={(e) => setTagVal(e.target.value)}
          variant="outlined"
          fullWidth
          size="small"
        />
        <IconButton sx={{ ml: "3px" }} onClick={handleAdd}>
          <AddCircleOutlineIcon />
        </IconButton>
      </Stack>
      {formData?.tags?.map((tag, index) => (
        <Chip
          key={index}
          label={tag}
          onDelete={() => handleDelete(tag)}
          sx={{ m: 0.5 }}
        />
      ))}
    </>
  );
}

export default MultiValField;
