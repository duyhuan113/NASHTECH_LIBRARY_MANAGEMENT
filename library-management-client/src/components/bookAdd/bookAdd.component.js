import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { GET, POST } from "../../api/apiServices";

import "../../global.styles.css";

const BookAdd = () => {
  const [categoryData, setcategoryData] = useState(null);
  const { register, handleSubmit } = useForm();

  const history = useHistory();

  useEffect(() => {
    GET("categories/all").then(
      (res) => setcategoryData(res.data),
      (err) => console.log(err)
    );
  }, []);

  const onSubmit = (data) => {
    data.authorId = Number(data.authorId);
    data.categoryId = Number(data.categoryId);
    data.quantity = Number(data.quantity);
    POST("books", data)
      .then(
        () => alert("Success"),
        (err) => console.log(err)
      )
      .then(() => history.push("/bookmanage"));
  };

  console.log(categoryData);
  return (
    <>
      {categoryData ? (
        <div style={{ width: "40vw", marginLeft: "17vw" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="container">
              <label>
                <b>Title</b>
              </label>
              <input
                type="text"
                placeholder="Enter Username"
                {...register("title", { required: true })}
              />
              <label>
                <b>Author</b>
              </label>
              <select {...register("authorId", { required: true })}>
                <option value="1">Bui</option>
                <option value="2">Duy</option>
                <option value="3">Huan</option>
              </select>
              <label>
                <b>Category</b>
              </label>
              <select {...register("categoryId", { required: true })}>
                {categoryData.map((elm) => (
                  <option key={elm.id} value={elm.id}>
                    {elm.name}
                  </option>
                ))}
              </select>
              <label>
                <b>Quantity</b>
              </label>
              <input
                type="number"
                {...register("quantity", { required: true })}
              />
              <label>
                <b>URL Image</b>
              </label>
              <input
                type="text"
                placeholder="Enter URL"
                {...register("imgCover", { required: true })}
              />
              <button type="submit" value="Add">
                ADD
              </button>
            </div>
          </form>
        </div>
      ) : (
        <h1>Loading</h1>
      )}
    </>
  );
};

export default BookAdd;
