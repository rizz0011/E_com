import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { tableColumns } from "../../Component/data";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import { format } from "date-fns";
import AddProduct from "./addProduct";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1976d2",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

var productId
export default function ProductTable({productData}) {
  
  const [open, setOpen] = React.useState(false);

 
  const handleClose = () => {
    setOpen(false);
  };



  const handeEdit = (item) => {
    console.log(item, "edit");
    setOpen(true)
    productId = item?.productID
  };

  const renderTableCell = (item, col, idx) => {
    switch (col.name) {
      case "ImgUrls":
        return (
          <StyledTableCell key={idx}>
            <img
              src={item.ImgUrls[0]}
              style={{ height: "40px", width: "40px" }}
              alt="Product"
            />
          </StyledTableCell>
        );

      case "edit":
        return (
          <StyledTableCell key={idx}>
            <IconButton onClick={() => handeEdit(item)}>
              <EditIcon />
            </IconButton>
          </StyledTableCell>
        );

      case "created_at":
        return (
          <StyledTableCell key={idx}>
            {format(item[col.name], "dd-MMM-yyyy")}
          </StyledTableCell>
        );

      default:
        return <StyledTableCell key={idx}>{item[col.name]}</StyledTableCell>;
    }
  };

  return (
    <>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {tableColumns?.map((col, index) => (
              <StyledTableCell key={index}>{col?.label}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {productData?.length > 0 ? (
            productData.map((item, index) => (
              <StyledTableRow key={index}>
                {tableColumns?.map((col, idx) => {
                  return renderTableCell(item, col, idx);
                })}
              </StyledTableRow>
            ))
          ) : (
            <StyledTableRow>
              <StyledTableCell colSpan={tableColumns.length} align="center">
                No Products Available
              </StyledTableCell>
            </StyledTableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
   {open && <AddProduct open={open} handleClose={handleClose} productId={productId}/> } 
    </>
  );
}
