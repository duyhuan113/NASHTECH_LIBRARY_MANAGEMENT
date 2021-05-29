import { useEffect, useState } from "react";
import { GET_BY_ID } from "../../../api/apiServices";
import { useParams, useHistory, Link } from "react-router-dom";
import { Button, Tag } from "antd";
import LoadingComponent from "../loading/loading.component";
import "./orderDetail.styles.css";

const OrderDetail = () => {
  const { id } = useParams();
  const [orderData, setOrderData] = useState(null);
  const history = useHistory();
  useEffect(() => {
    GET_BY_ID("orders/detail", id).then(
      (res) => setOrderData(res.data),
      (err) => console.log(err)
    );
  }, []);

  console.log(orderData);
  return (
    <div className="wrap_container">
      <h2>Order Detail</h2>

      {orderData ? (
        <div class="invoice-card">
          <div class="invoice-title">
            <div id="main-title">
              <h4>INVOICE</h4>
              <span>#{orderData.id}</span>
            </div>
            <span id="date">{orderData.createdDate.slice(0, 10)}</span>
          </div>

          <div className="invoice-details">
            <table className="invoice-table">
              <thead>
                <tr>
                  <td>TITLE</td>
                  <td>UNIT</td>
                </tr>
              </thead>
              <tbody>
                {orderData.orderDetails.map((elm, i) => (
                  <tr key={i} className="row-data">
                    <td>{elm.book.title} </td>
                    <td id="unit">{elm.itemQuantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="invoice-footer">
            <Button className="btn btn-primary">
              <Link to="/ordermanage">
                <Tag color="geekblue">{orderData.status.toUpperCase()}</Tag>
              </Link>
            </Button>
          </div>
        </div>
      ) : (
        <LoadingComponent />
      )}
    </div>
  );
};

export default OrderDetail;
