import { useEffect, useState } from "react";
import { GET_BY_ID } from "../../api/apiServices";
import { useParams } from "react-router-dom";

import "./orderDetail.styles.css";

const OrderDetail = () => {
  const { id } = useParams();
  console.log(id);
  const [orderData, setOrderData] = useState(null);
  useEffect(() => {
    GET_BY_ID("orders/detail", id).then(
      (res) => setOrderData(res.data),
      (err) => console.log(err)
    );
  }, []);

  console.log(orderData);
  return (
    <>
      {orderData ? (
        <div class="invoice-card">
          <div class="invoice-title">
            <div id="main-title">
              <h4>INVOICE</h4>
              <span>#{orderData.id}</span>
            </div>

            <span id="date">{orderData.createdDate.slice(0, 10)}</span>
          </div>

          <div class="invoice-details">
            <table class="invoice-table">
              <thead>
                <tr>
                  <td>TITLE</td>
                  <td>UNIT</td>
                </tr>
              </thead>

              <tbody>
                {orderData.orderDetails.map((elm, i) => (
                  <tr key={i} class="row-data">
                    <td>{elm.book.title} </td>
                    <td id="unit">{elm.itemQuantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div class="invoice-footer">
            
            <button class="btn btn-primary">{orderData.status}</button>
          </div>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
};

export default OrderDetail;
