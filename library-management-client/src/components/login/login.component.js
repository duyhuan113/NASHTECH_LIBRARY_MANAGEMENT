import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { POST } from "../../api/apiServices";
import CurrentUserContext from "../../contexts/currentUserContext";
const LoginComponent = () => {
  const { currentUser, setcurrentUser } = useContext(CurrentUserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
const history = useHistory()
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
        setLoginRole(data.role)
      });
  };

   const setLoginRole = (role) => {
     if (role == "admin") {
       history.push("/ordermanage");
     } else {
       history.push("/homepage");
     }
   };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("username")} />
        <input {...register("password", { required: true })} />
        <input type="submit" value="login" />
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
