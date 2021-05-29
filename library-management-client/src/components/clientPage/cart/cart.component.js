import { useContext } from "react";

import { POST } from "../../../api/apiServices";
import { CartContext } from "../../../contexts/cartContext/CartContext";
import CurrentUserContext from "../../../contexts/currentUserContext";
import { DeleteOutlined } from "@ant-design/icons";
import "./cart.style.css";

const CartComponent = () => {
  const { cartItems, clearCart, removeProduct } = useContext(CartContext);
  const { currentUser } = useContext(CurrentUserContext);
  const { user } = currentUser;

  const handleCheckout = () => {
    const dataToAdd = {
      status: "waiting",
      userId: Number(user.nameid),
      orderDetails: [],
    };

    cartItems.map((elm) => dataToAdd.orderDetails.push({ bookId: elm.id }));
    console.log(dataToAdd);
    if (cartItems && cartItems.length > 0) {
      POST("orders", dataToAdd).then(
        () => {
          window.alert("Success, please check your history");
          clearCart();
        },
        (err) => console.log(err.response.data)
      );
    }
  };

  console.log(cartItems);
  return (
    <div className="wrap_container">
      <h1>CART ITEM</h1>
      {cartItems && cartItems.length > 0 ? (
        <>
          <table className="cart__tbl">
            <thead>
              <tr>
                <th>TITLE</th>
                <th>UNIT</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {cartItems.map((elm, i) => (
                <tr key={i}>
                  <td style={{ width: "500px" }}>{elm.title} </td>
                  <td style={{ width: "150px" }}>{elm.quantity}</td>
                  <td
                    style={{ width: "150px" }}
                    onClick={() => removeProduct(elm)}
                  >
                    <DeleteOutlined />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={() => handleCheckout()}>Order</button>
        </>
      ) : (
        <h1>Cart is Empty.</h1>
      )}
    </div>
  );
};

export default CartComponent;
