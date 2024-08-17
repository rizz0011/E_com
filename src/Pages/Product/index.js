import React from "react";
import Box from "@mui/material/Box";
import { Grid, Button } from "@mui/material";
import AddProduct from "./Component/addProduct";
import ProductTable from "./Component/productTable";
import SearchBar from "./Component/SearchBar";



function Product() {

    const [open, setOpen] = React.useState(false);

    const [productData, setProductData] = React.useState([]);

    const fetchProductList = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/v1/product/getAllProducts"
        );
        const data = await response.json();
        console.log(data);
        
        setProductData(data?.data || []);
      } catch (error) {
        console.error("Failed to fetch product data:", error);
      }
    };
  
    React.useEffect(() => {
      fetchProductList();
    }, [open]);
   


    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

  return (
    <Box component="section" sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid item sm={6} sx={{display:'flex', justifyContent:'flex-start'}}> 
          <SearchBar/>

        </Grid>
        <Grid item sm={6} sx={{display:'flex', justifyContent:'flex-end'}}>
        <Button variant="contained" onClick={handleClickOpen}>Add Product</Button>
        </Grid>
        <Grid item sm={12}>
            <ProductTable productData={productData}/>
        </Grid>
      </Grid>
      {open && <AddProduct open={open} handleClose={handleClose} />}
    </Box>
  );
}

export default Product;
