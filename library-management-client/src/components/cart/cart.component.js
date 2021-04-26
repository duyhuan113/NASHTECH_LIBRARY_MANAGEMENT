import { useContext, useEffect, useState } from "react";
import { POST } from "../../api/apiServices";
import { CartContext } from "../../contexts/cartContext/CartContext";
import CurrentUserContext from "../../contexts/currentUserContext";

const CartComponent = () => {
  const { cartItems, clearCart } = useContext(CartContext);
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
  return (
    <>
      {cartItems ? (
        <table>
          <thead>
            <tr>
              <td>TITLE</td>
              <td>UNIT</td>
            </tr>
          </thead>

          <tbody>
            {cartItems.map((elm, i) => (
              <tr key={i}>
                <td>{elm.title} </td>
                <td>{elm.quantity}</td>
              </tr>
            ))}
          </tbody>
          <button onClick={() => handleCheckout()}>Order</button>
        </table>
      ) : (
        <h1>Cart is empty</h1>
      )}
    </>
  );
};

export default CartComponent;
