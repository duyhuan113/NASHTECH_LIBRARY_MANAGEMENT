import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router";
import { GET, GET_BY_ID, PUT } from "../../../api/apiServices";
import LoadingComponent from "../../common/loading/loading.component";
const BookUpdate = () => {
  const [bookData, setBookData] = useState(null);
  const [categoryData, setcategoryData] = useState(null);
  const { id } = useParams();
  const { register, handleSubmit, setValue } = useForm();
  const history = useHistory();

  useEffect(() => {
    GET_BY_ID("books", id).then(
      (res) => setBookData(res.data),
      (err) => console.log(err)
    );
  }, []);

  useEffect(() => {
    GET("categories/all").then(
      (res) => setcategoryData(res.data),
      (err) => console.log(err)
    );
  }, []);

  useEffect(() => {
    if (categoryData && bookData) {
      setValue("title", bookData.title);
      setValue("quantity", bookData.quantity);
      setValue("imgCover", bookData.imgCover);
    }
  }, [categoryData]);

  const onSubmit = (data) => {
    if (data.quantity > 0) {
      PUT("books", id, data)
        .then(
          () => alert("Success"),
          (err) => console.log(err)
        )
        .then(() => history.push("/bookmanage"));
    } else {
      alert("Invalid Quantity");
    }
  };

  return (
    <>
      {bookData && categoryData ? (
        <div style={{ width: "40vw", marginLeft: "17vw" }}>
          <h2>Update Book</h2>

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
                {categoryData ? (
                  categoryData.map((elm) => (
                    <option key={elm.id} value={elm.id}>
                      {elm.name}
                    </option>
                  ))
                ) : (
                  <LoadingComponent />
                )}
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
                UPDATE
              </button>
            </div>
          </form>
        </div>
      ) : (
        <LoadingComponent />
      )}
    </>
  );
};

export default BookUpdate;
