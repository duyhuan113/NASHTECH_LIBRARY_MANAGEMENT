import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "antd/dist/antd.css";
import { Layout } from "antd";

import CurrentUserContext from "./contexts/currentUserContext";
import MenuComponent from "./components/common/menu/menu.component";
import LoginComponent from "./components/common/login/login.component";
import OrderManage from "./components/adminPage/orderManage/orderManage.component";
import OrderDetail from "./components/common/orderDetail/orderDetail.component";
import BookManage from "./components/adminPage/bookManage/bookManage.component";
import BookUpdate from "./components/adminPage/bookUpdate/bookUpdate.component";
import BookAdd from "./components/adminPage/bookAdd/bookAdd.component";
import CategoryManage from "./components/adminPage/categoryManage/categoryManage.component";
import CategoryUpdate from "./components/adminPage/categoryUpdate/categoryUpdate.component";
import CategoryAdd from "./components/adminPage/CategoryAdd/categoryAdd.component";
import HomePageComponent from "./components/clientPage/homePage/hompage.component";
import CartContextProvider from "./contexts/cartContext/CartContext";
import HistoryOrder from "./components/clientPage/historyOrder/historyOrder.component";
import CartComponent from "./components/clientPage/cart/cart.component";

import "./App.css";

const { Header, Sider, Content } = Layout;
const App = () => {
  const [currentUser, setcurrentUser] = useState({ token: null, user: null });

  const { token } = currentUser;

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
                <Sider trigger={null} collapsible>
                  <div className="logo" />
                  <MenuComponent />
                </Sider>
                <Layout className="site-layout">
                  <Header
                    className="site-layout-background"
                    style={{ padding: 0 }}
                  ></Header>
                  <Content
                    className="site-layout-background"
                    style={{
                      margin: "24px 16px",
                      padding: 24,
                      minHeight: 280,
                    }}
                  >
                    <Route exact path="/ordermanage">
                      <OrderManage />
                    </Route>

                    <Route exact path="/orderdetail/:id">
                      <OrderDetail />
                    </Route>
                    <Route exact path="/bookmanage">
                      <BookManage />
                    </Route>
                    <Route exact path="/bookmanage/add">
                      <BookAdd />
                    </Route>
                    <Route exact path="/bookupdate/:id">
                      <BookUpdate />
                    </Route>
                    <Route exact path="/categorymanage">
                      <CategoryManage />
                    </Route>
                    <Route exact path="/categoryupdate/:id">
                      <CategoryUpdate />
                    </Route>
                    <Route exact path="/categorymanage/add">
                      <CategoryAdd />
                    </Route>
                    <Route exact path="/homepage">
                      <HomePageComponent />
                    </Route>
                    <Route exact path="/history">
                      <HistoryOrder />
                    </Route>

                    <Route exact path="/cart">
                      <CartComponent />
                    </Route>
                  </Content>
                </Layout>
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
