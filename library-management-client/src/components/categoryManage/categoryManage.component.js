import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { GET, DELETE } from "../../api/apiServices";

import "../../global.styles.css";
const CategoryManage = () => {
  const [categoryData, setcategoryData] = useState(null);
  const [somethingChange, setsomethingChange] = useState(false);
  useEffect(() => {
    GET("categories/all").then((res) => setcategoryData(res.data));
  }, [somethingChange]);

  const handleDelete = (id) => {
    if (window.confirm("DO your want Delete this item?")) {
      DELETE("categories", id).then(
        () => {
          setsomethingChange(!somethingChange);
        },
        (err) => console.log(err)
      );
    }
  };

  console.log(categoryData);
  return (
    <div>
      <table id="customers">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>

            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categoryData ? (
            categoryData.map((elm) => (
              <tr key={elm.id}>
                <td>{elm.id}</td>
                <td>{elm.name}</td>

                <td>
                  <button onClick={() => handleDelete(elm.id)}>Delete</button>
                  <br />
                  <Link to={`/categoryupdate/${elm.id}`}>Update</Link>
                </td>
              </tr>
            ))
          ) : (
            <h1>Loading...</h1>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryManage;
