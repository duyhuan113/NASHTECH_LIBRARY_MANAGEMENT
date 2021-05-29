import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { GET, PUT } from "../../../api/apiServices";
import { Tag } from "antd";
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
      return <Tag color="green">CONFIRM</Tag>;
    } else if (status === "reject") {
      return <Tag color="red">REJECT</Tag>;
    } else {
      return (
        <>
          <button
            style={{ backgroundColor: "green" }}
            onClick={() => handleUpdate(id, "confirm")}
          >
            Accept
          </button>
          <button
            style={{ backgroundColor: "red" }}
            onClick={() => handleUpdate(id, "reject")}
          >
            Deny
          </button>
        </>
      );
    }
  };

  return (
    <div>
      <h2>Order Management</h2>
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
                  <button>
                    <Link
                      style={{ color: "white" }}
                      to={`/orderdetail/${elm.id}`}
                    >
                      Detail
                    </Link>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <h1>Loading...</h1>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderManage;
