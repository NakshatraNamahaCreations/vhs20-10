import React, { useEffect, useState } from "react";
import Header from "./Header";
import Sidenav from "./Sidenav";
import Button from "react-bootstrap/Button";
import axios from "axios";

function ServiceBooking() {
  const [servicedata, setservicedata] = useState([]);
  const [displayedRows, setDisplayedRows] = useState(5);
  const showAllRows = () => {
    setDisplayedRows(servicedata.length);
  };
  const showFewerRows = () => {
    setDisplayedRows(5);
  };

  useEffect(() => {
    getappcustomer();
  }, []);

  const getappcustomer = async () => {
    let res = await axios.get(
      "http://localhost:8080/api/getrunningdata"
    );
    if ((res.status = 200)) {
      setservicedata(
        res.data?.runningdata.filter(
          (i) => i.type === "userapp" || i.type === "website"
        )
      );
    }
  };

  const formatDate = dateString => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-based, so we add 1
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  
  return (
    <div className="row">
      <div className="col-md-2">
        <Sidenav />
      </div>
      <div className="col-md-10">
        <Header />
        <div className="row  set_margin ">
          <div>
            <div className="d-flex  mt-3">
              <h4 style={{ color: "#FF0060" }}>Service Orders </h4>
            </div>
          </div>
        </div>
        {displayedRows < servicedata.length ? (
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
        <div className="row">
          <table class="table table-hover table-bordered mt-5">
            <thead className="text-align-center">
              <tr className="table-secondary ">
                <th className="table-head" scope="col">
                  S.No
                </th>
                <th className="table-head" scope="col">
                  User Name
                </th>
                <th className="table-head" scope="col">
                  User Email
                </th>
                <th className="table-head" scope="col">
                  User Address
                </th>
                <th className="table-head" scope="col">
                  User Contact No.
                </th>
                <th className="table-head" scope="col">
                  Service Name
                </th>
                <th className="table-head" scope="col">
                  Service Price
                </th>
                <th className="table-head" scope="col">
                Payment Mode
                </th>
                <th className="table-head" scope="col">
                  Discount Amt
                </th>
                <th className="table-head" scope="col">
                  Booked Date
                </th>

                <th className="table-head" scope="col">
                  Service Dates
                </th>
                <th className="table-head" scope="col">
                  Grand Total
                </th>
              </tr>
            </thead>
            <tbody className="justify-content-center">
              {servicedata.slice(0, displayedRows).map((item, index) => (
                <tr className="user-tbale-body text-center">
                  <td>{index + 1}</td>
                  <td>{item?.customer[0]?.customerName}</td>
                  <td>{item?.customer[0]?.email}</td>
                  <td>
                    <div>
                      {item?.deliveryAddress.platNo},
                      {item?.deliveryAddress.landmark}
                    </div>
                    {item?.deliveryAddress.address}
                  </td>
                  <td>{item?.customer[0]?.mainContact}</td>
                  <td>{item?.service}</td>
                  <td>{item?.serviceCharge}</td>

                  <td>{item?.paymentMode}</td>
                  <td>{item?.discAmt}</td>
                  <td>{item.date}</td>
                  <td> {item?.dividedDates?.map(dateInfo => (
                    <div
                     
                      key={dateInfo.id}>
                      {formatDate(dateInfo.date)}
                    </div>
                  ))}</td>
                  <td>{item?.GrandTotal}</td>
                </tr>
              ))}
            </tbody>
          </table>{" "}
        </div>
      </div>
    </div>
  );
}

export default ServiceBooking;
