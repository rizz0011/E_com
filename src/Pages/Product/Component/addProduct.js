import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Divider, Stack, Button, Grid } from "@mui/material";
import { commonFields } from "../../Component/data";
import InputAddField from "./Fields/InputAddField";
import DropdownField from "./Fields/DropdownField";
import MultiValField from "./Fields/MultiValField";
import InputFieldTextArea from "./Fields/InputFieldTextArea";
import ImageUplaod from "./imageUpload";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "5px",
};

export default function AddProduct({ open, handleClose, productId }) {
  const [formData, setFormData] = React.useState({
    title: "",
    description: "",
    category: "",
    actualPrice: "",
    comparePrice: "",
    status: "",
    quantity: "",
    weight: "",
    tags: [],
    collection: "",
    ImgUrls: [],
  });

  console.log(productId, "pid");

  const fetchProductDetails = async () => {
    const res = await fetch(
      `http://localhost:8000/v1/product/getProduct/${productId}`
    );
    const data = await res.json();
    console.log(data, "----000");

    setFormData(data?.data[0]);
  };

  React.useEffect(() => {
    if (productId) {
      fetchProductDetails();
    }
  }, [productId]);

  console.log(formData, "--s-s--s");

  const handleSave = async () => {
    console.log("Form Data:", formData);

    try {
      const response = productId ?  await fetch( `http://localhost:8000/v1/product/edit`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }) : 
      await fetch( `http://localhost:8000/v1/product/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      handleClose();

    } catch (error) {
      console.log("error--",error)
    }
  };

  const renderComponentField = (fields, index) => {
    switch (fields?.renderType) {
      case "textField":
        return (
          <InputAddField
            fields={fields}
            idx={index}
            formData={formData}
            setFormData={setFormData}
          />
        );

      case "dropdownField":
        return (
          <DropdownField
            fields={fields}
            idx={index}
            formData={formData}
            setFormData={setFormData}
          />
        );

      case "multiValField":
        return (
          <MultiValField
            fields={fields}
            idx={index}
            formData={formData}
            setFormData={setFormData}
          />
        );
      case "textArea":
        return (
          <InputFieldTextArea
            fields={fields}
            idx={index}
            formData={formData}
            setFormData={setFormData}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div>
      <Modal open={open}>
        <Box sx={style}>
          <Stack sx={{ p: 2 }}>
            <Typography sx={{ fontSize: "1rem", fontWeight: "600" }}>
              {productId ? "Edit Product" : "Add Product"}
            </Typography>
          </Stack>
          <Divider />
          <Stack sx={{ maxHeight: "450px", overflow: "auto", p: 2 }}>
            <Grid container spacing={2}>
              <Grid item sm={12}>
                {commonFields?.map((fields, index) => {
                  return renderComponentField(fields, index);
                })}
              </Grid>

              <Grid item sm={12}>
                <ImageUplaod formData={formData} setFormData={setFormData} />
              </Grid>
            </Grid>
          </Stack>
          <Divider />
          <Stack
            direction="row"
            spacing={2}
            sx={{ p: 1.5 }}
            justifyContent="flex-end"
            alignItems="flex-end"
          >
            <Button
              variant="outlined"
              size="small"
              onClick={() => handleClose()}
            >
              Close
            </Button>
            <Button variant="contained" size="small" onClick={handleSave}>
              {productId ? "Update" : " Save"}
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
