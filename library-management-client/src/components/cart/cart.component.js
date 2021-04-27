import { useContext} from "react";
import { POST } from "../../api/apiServices";
import { CartContext } from "../../contexts/cartContext/CartContext";
import CurrentUserContext from "../../contexts/currentUserContext";

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
  return (
    <>
      {cartItems && cartItems > 0 ? (
        <table>
          <thead>
            <tr>
              <td>TITLE</td>
              <td>UNIT</td>
              <td></td>
            </tr>
          </thead>

          <tbody>
            {cartItems.map((elm, i) => (
              <tr key={i}>
                <td>{elm.title} </td>
                <td>{elm.quantity}</td>
                <td onClick={() => removeProduct(elm)}>remove</td>
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
