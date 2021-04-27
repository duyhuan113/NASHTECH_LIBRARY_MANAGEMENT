import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { GET, PUT } from "../../api/apiServices";

const OrderManage = () => {
  const [orderData, setOrderData] = useState(null);
  const [somethingChange, setSomethingChange] = useState(false);
  useEffect(() => {
    GET("orders/all").then((res) => setOrderData(res.data));
  }, [somethingChange]);

  const handleUpdate = (id, status) => {
    PUT(`orders`, id, { status: status }).then(() =>
      setSomethingChange(!somethingChange)
    );
  };

  const setStatus = (id, status) => {
    if (status === "confirm") {
      return <span>CONFIRM</span>;
    } else if (status === "reject") {
      return <span>REJECT</span>;
    } else {
      return (
        <>
          <button
            style={{ backgroundColor: "green" }}
            onClick={() => handleUpdate(id, "confirm")}
          >
            confirm
          </button>
          <button
            style={{ backgroundColor: "red" }}
            onClick={() => handleUpdate(id, "reject")}
          >
            reject
          </button>
        </>
      );
    }
  };

  return (
    <div>
      <table id="customers">
        <thead>
          <tr>
            <th>Id</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orderData ? (
            orderData.map((elm) => (
              <tr key={elm.id}>
                <td>{elm.id}</td>
                <td>{elm.orderDetails.length}</td>
                <td>{setStatus(elm.id, elm.status)}</td>
                <td>
                  <button >
                    <Link style={{ color: "white" }} to={`/orderdetail/${elm.id}`}>Detail</Link>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <h1>Loading...</h1>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderManage;
