import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import "antd/dist/antd.css";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import CurrentUserContext from "../../contexts/currentUserContext";
import { CartContext } from "../../contexts/cartContext/CartContext";
const { Header, Sider, Content } = Layout;
const MenuComponent = () => {
  const { currentUser, setcurrentUser } = useContext(CurrentUserContext);

  const { itemCount } = useContext(CartContext);
  const { token, user } = currentUser;
  const history = useHistory();
  const handleLogout = () => {
    if (window.confirm("Do you want logout")) {
      localStorage.removeItem("token");
      setcurrentUser({ token: null, user: null });
      history.push("/");
    }
  };

  let navMenu = null;
  if (user.role === "admin") {
    return (navMenu = (
      <>
        <Link to="/ordermanage">Order Management</Link>
        <br />
        <Link to="/bookmanage">Book Management</Link>
        <br />
        <Link to="/bookmanage/add">Add Book</Link>
        <br />
        <Link to="/categorymanage">Category Management</Link>
        <br />
        <Link to="/categorymanage/add">Add Category</Link>
        <br />
      </>
    ));
  } else {
    navMenu = (
      <>
        <Link to="/homepage">Homepage</Link>
        <br />
        <Link to="/history">History</Link>
        <br />
        <Link to="/cart">Cart ( {itemCount})</Link>
        <br />
      </>
    );
  }

  return (
    <>
      {navMenu}
      <Link onClick={() => handleLogout()}>Logout</Link>
    </>
  );
};

export default MenuComponent;
