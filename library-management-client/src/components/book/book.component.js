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
    <div className="el-wrapper">
      <div className="box-up">
        <img className="img" src={imgCover} alt="" />
        <div className="img-info">
          <div className="info-inner">
            <span className="p-name">{title}</span>
          </div>
        </div>
      </div>

      <div className="box-down">
        <div className="h-bg">
          <div className="h-bg-inner"></div>
        </div>
        <a className="cart" href="#">
          <span className="price">{quantity} Left</span>
          <span className="add-to-cart">
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
