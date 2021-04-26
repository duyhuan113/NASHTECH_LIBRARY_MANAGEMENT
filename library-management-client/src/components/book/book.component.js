import { useContext } from "react";
import { CartContext } from "../../contexts/cartContext/CartContext";
import "./book.styles.css";
const BookComponent = (props) => {
    const { title, quantity, imgCover } = props
  const { addProduct, cartItems, increase } = useContext(CartContext);

  const isInCart = (product) => {
    return !!cartItems.find((item) => item.id === product.id);
  };

  return (
    <div class="el-wrapper">
      <div class="box-up">
        <img class="img" src={imgCover} alt="" />
        <div class="img-info">
          <div class="info-inner">
            <span class="p-name">{title}</span>
          </div>
        </div>
      </div>

      <div class="box-down">
        <div class="h-bg">
          <div class="h-bg-inner"></div>
        </div>
        <a class="cart" href="#">
          <span class="price">{quantity} Left</span>
          <span class="add-to-cart">
            {isInCart(props) && (
              <button
                onClick={() => increase(props)}
                className="btn btn-outline-primary btn-sm"
              >
                Add more
              </button>
            )}

            {!isInCart(props) && (
              <button
                onClick={() => addProduct(props)}
                className="btn btn-primary btn-sm"
              >
                Add to cart
              </button>
            )}
          </span>
        </a>
      </div>
    </div>
  );
};

export default BookComponent;
