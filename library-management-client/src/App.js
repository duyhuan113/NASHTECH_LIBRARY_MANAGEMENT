import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, useHistory } from "react-router-dom";
import "antd/dist/antd.css";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";

import CurrentUserContext from "./contexts/currentUserContext";
import MenuComponent from "./components/menu/menu.component";
import LoginComponent from "./components/login/login.component";
import OrderManage from "./components/orderManage/orderManage.component";
import OrderDetail from "./components/orderDetail/orderDetail.component";
import BookManage from "./components/bookManage/bookManage.component";
import BookUpdate from "./components/bookUpdate/bookUpdate.component";
import BookAdd from "./components/bookAdd/bookAdd.component";
import CategoryManage from "./components/categoryManage/categoryManage.component";
import CategoryUpdate from "./components/categoryUpdate/categoryUpdate.component";
import CategoryAdd from "./components/CategoryAdd/categoryAdd.component";
import HomePageComponent from "./components/homepage/hompage.component";
import CartContextProvider from "./contexts/cartContext/CartContext";
import HistoryOrder from "./components/historyOrder/historyOrder.component";
import CartComponent from "./components/cart/cart.component";
import "./App.css";

const { Header, Sider, Content } = Layout;
const App = () => {
  const [currentUser, setcurrentUser] = useState({ token: null, user: null });
  const [collapse, setcollapse] = useState(false);

  const { token, user } = currentUser;
  const history = useHistory();

  useEffect(() => {
    const tokenJson = localStorage.getItem("token")
      ? localStorage.getItem("token")
      : null;
    const dataUser = localStorage.getItem("token") ? parseJwt(tokenJson) : null;
    setcurrentUser({ token: tokenJson, user: dataUser });
  }, [token]);

  return (
    <div className="App">
      <Router>
        <CurrentUserContext.Provider value={{ currentUser, setcurrentUser }}>
          <CartContextProvider>
            {token ? (
              <Layout>
                <Sider trigger={null} collapsible collapsed={collapse}>
                  <div className="logo" />
                  <MenuComponent />
                </Sider>

                <Route exact path="/ordermanage">
                  {!token ? <LoginComponent /> : <OrderManage />}
                </Route>
                <Route exact path="/orderdetail/:id">
                  {!token ? <LoginComponent /> : <OrderDetail />}
                </Route>
                <Route exact path="/bookmanage">
                  {!token ? <LoginComponent /> : <BookManage />}
                </Route>
                <Route exact path="/bookmanage/add">
                  {!token ? <LoginComponent /> : <BookAdd />}
                </Route>
                <Route exact path="/bookupdate/:id">
                  {!token ? <LoginComponent /> : <BookUpdate />}
                </Route>
                <Route exact path="/categorymanage">
                  {!token ? <LoginComponent /> : <CategoryManage />}
                </Route>
                <Route exact path="/categoryupdate/:id">
                  {!token ? <LoginComponent /> : <CategoryUpdate />}
                </Route>
                <Route exact path="/categorymanage/add">
                  {!token ? <LoginComponent /> : <CategoryAdd />}
                </Route>

                <Route exact path="/homepage">
                  {!token ? <LoginComponent /> : <HomePageComponent />}
                </Route>
                <Route exact path="/history">
                  {!token ? <LoginComponent /> : <HistoryOrder />}
                </Route>

                <Route exact path="/cart">
                  {!token ? <LoginComponent /> : <CartComponent />}
                </Route>
              </Layout>
            ) : (
              <Route exact path="/">
                <LoginComponent />
              </Route>
            )}
          </CartContextProvider>
        </CurrentUserContext.Provider>
      </Router>
    </div>
  );
};

export default App;

const parseJwt = (token) => {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};
