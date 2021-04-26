import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { GET_BY_ID, PUT } from "../../api/apiServices";
import CurrentUserContext from "../../contexts/currentUserContext";

const HistoryOrder = () => {
  const [orderData, setOrderData] = useState(null);
  const { currentUser } = useContext(CurrentUserContext);
  const { user } = currentUser;
  useEffect(() => {
    GET_BY_ID("orders", Number(user.nameid)).then((res) =>
      setOrderData(res.data)
    );
  }, []);

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
                <td>{(elm.id, elm.status)}</td>
                <td>
                  <Link to={`/orderdetail/${elm.id}`}>Detail</Link>
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

export default HistoryOrder;
