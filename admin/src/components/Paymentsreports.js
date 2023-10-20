import React, { useEffect, useState } from "react";
import Sidenav from "./Sidenav";
import Header from "./Header";
import { useContext } from "react";
import { CreateToggle } from "./TogglerProvider";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgb(176, 39, 39)",
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
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
function Paymentsreports() {
  const { light } = useContext(CreateToggle);

  const [userdata, setuserdata] = useState([]);
  const [Servicedata, setServicedata] = useState([]);
  const [paymentdata, setpaymentdata] = useState([]);
  const [displayedRows, setDisplayedRows] = useState(5);
  const showAllRows = () => {
    setDisplayedRows(paymentdata.length);
  };
  const showFewerRows = () => {
    setDisplayedRows(5);
  };

  const formatdate = (fdate) => {
    const date = new Date(fdate);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  };
useEffect(() => {
  getapppauyments();
}, [])

  const getapppauyments = async () => {
    let res = await axios.get(
      "http://api.vijayhomeservicebengaluru.in/api/payment/service/paywithuserdata"
    );
    if ((res.status = 200)) {
      setpaymentdata(res.data?.userdata);
    }
  };

  return (
    <div className="row">
      <div className="col-md-2">
        <Sidenav />
      </div>
      <div className="col-md-10">
        <Header />

        <div>
          <div style={{}}>
            <h3>Transctions List</h3>
          </div>
          {displayedRows < paymentdata.length ? (
            <div>
              <button
                onClick={showAllRows}
                style={{
                  float: "right",
                  background: "darkred",
                  color: "white",
                }}
              >
                Show All
              </button>
            </div>
          ) : (
            <div>
              <button
                onClick={showFewerRows}
                style={{
                  float: "right",
                  background: "darkred",
                  color: "white",
                }}
              >
                Show less
              </button>
            </div>
          )}
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                <StyledTableCell>Sl.No</StyledTableCell>
                  <StyledTableCell>Transcation ID</StyledTableCell>
                  <StyledTableCell align="right">Customer Name</StyledTableCell>
                  <StyledTableCell align="right">
                    Customer Number
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    Customer Email
                  </StyledTableCell>
                  <StyledTableCell align="right">Date</StyledTableCell>
                  <StyledTableCell align="right">Amount</StyledTableCell>
                  <StyledTableCell align="right">Status</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paymentdata.slice(0, displayedRows).map((i,index) => (
                  <StyledTableRow key={i.data?.transactionId}>
                      <StyledTableCell component="th" scope="row">
                      {index+1}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {i.data?.transactionId}
                    </StyledTableCell>
                    <StyledTableCell align="right">{i?.userdata[0]?.customerName}</StyledTableCell>
                    <StyledTableCell align="right">
                      {i?.userdata[0]?.mainContact}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {i?.userdata[0]?.email}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {formatdate(i.createdAt)}
                    </StyledTableCell>

                    <StyledTableCell align="right">
                      {i.data?.amount / 100}
                    </StyledTableCell>
                    <StyledTableCell align="right">Paid</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

      </div>
    </div>
  );
}

export default Paymentsreports;
