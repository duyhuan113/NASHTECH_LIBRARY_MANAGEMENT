import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { POST } from "../../api/apiServices";
import CurrentUserContext from "../../contexts/currentUserContext";

import "../../global.styles.css";
const LoginComponent = () => {
  const {  setcurrentUser } = useContext(CurrentUserContext);
  const {
    register,
    handleSubmit,
  } = useForm();
  const history = useHistory();
  const onSubmit = (data) => {
    POST("user/login", data)
      .then(
        (res) => {
          localStorage.setItem("token", res.data);

          return parseJwt(res.data);
        },
        (err) => console.log(err)
      )
      .then((data) => {
        setcurrentUser(data);
        setLoginRole(data.role);
      });
  };

  const setLoginRole = (role) => {
    if (role === "admin") {
      history.push("/ordermanage");
    } else {
      history.push("/homepage");
    }
  };
  
  return (
    <div style={{width:"40vw", marginLeft:"30vw"}}>
      <h1>LOGIN FORM</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="container">
          <label >
            <b>Username</b>
          </label>
          <input
            type="text"
            placeholder="Enter Username"
            name="uname"
            {...register("username")}
          />
          <label >
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="psw"
            {...register("password", { required: true })}
          />
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default LoginComponent;

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
