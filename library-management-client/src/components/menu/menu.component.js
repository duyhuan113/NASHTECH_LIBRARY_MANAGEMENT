import { useContext } from "react";
import { Link } from "react-router-dom";

import CurrentUserContext from "../../contexts/currentUserContext";

const MenuComponent = () => {
  const { currentUser, setcurrentUser } = useContext(CurrentUserContext);
  const { token ,user} = currentUser;

  const handleLogout = () => {
    localStorage.removeItem("token");
    setcurrentUser({ token: null, user: null });
  };
  return (
    <div>
      {token ? (
        user.role === "admin" ? (
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
            <Link onClick={() => handleLogout()}>Logout</Link>
          </>
        ) : (
          <>
            <Link to="/homepage">Homepage</Link>
            <br />
            <Link to="/history">History</Link>
            <br />
            <Link to="/cart">Cart</Link>

            <Link onClick={() => handleLogout()}>Logout</Link>
          </>
        )
      ) : (
        ""
      )}
    </div>
  );
};

export default MenuComponent;
