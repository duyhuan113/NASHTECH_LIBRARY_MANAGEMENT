import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import "antd/dist/antd.css";
import { Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";
import CurrentUserContext from "../../contexts/currentUserContext";
import { CartContext } from "../../contexts/cartContext/CartContext";

const { SubMenu } = Menu;

const MenuComponent = () => {
  const { currentUser, setcurrentUser } = useContext(CurrentUserContext);

  const { itemCount } = useContext(CartContext);
  const { user } = currentUser;
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
    navMenu = (
      <>
        <Menu.Item key="1" icon={<UserOutlined />}>
          <Link to="/ordermanage">Order Management</Link>
        </Menu.Item>
        <SubMenu key="sub1" icon={<UserOutlined />} title="Book Manage ">
          <Menu.Item key="2" icon={<UserOutlined />}>
            <Link to="/bookmanage">Book</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<UserOutlined />}>
            <Link to="/bookmanage/add">Add</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<UserOutlined />} title="Category Manage">
          <Menu.Item key="4" icon={<UserOutlined />}>
            <Link to="/categorymanage">Category</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<UserOutlined />}>
            <Link to="/categorymanage/add">Add</Link>
          </Menu.Item>
        </SubMenu>
      </>
    );
  } else {
    navMenu = (
      <>
        <Menu.Item key="1" icon={<UserOutlined />}>
          <Link to="/homepage">Homepage</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<UserOutlined />}>
          <Link to="/history">History</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<UserOutlined />}>
          <Link to="/cart">Cart ( {itemCount})</Link>
        </Menu.Item>
      </>
    );
  }
  return (
    <>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
        {navMenu}
        <Menu.Item key="7" icon={<UserOutlined />}>
          <Link to="/" onClick={() => handleLogout()}>
            Logout
          </Link>
        </Menu.Item>
      </Menu>
    </>
  );
};

export default MenuComponent;
