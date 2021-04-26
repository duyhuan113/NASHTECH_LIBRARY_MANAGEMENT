import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { GET, POST } from "../../api/apiServices";
const BookAdd = () => {
  const [categoryData, setcategoryData] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const history = useHistory();

  useEffect(() => {
    GET("categories/all").then(
      (res) => setcategoryData(res.data),
      (err) => console.log(err)
    );
  }, []);

  const onSubmit = (data) => {
    POST("books", data)
      .then(
        () => alert("Success"),
        (err) => console.log(err)
      )
      .then(() => history.push("/bookmanage"));
  };

  return (
    <>
      {categoryData ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register("title", { required: true })} />
          <select {...register("authorId", { required: true })}>
            <option value="1">Bui</option>
            <option value="2">Duy</option>
            <option value="3">Huan</option>
          </select>
          <select {...register("categoryId", { required: true })}>
            {categoryData.map((elm) => (
              <option key={elm.id} value={elm.id}>
                {elm.name}
              </option>
            ))}
          </select>
          <input type="number" {...register("quantity", { required: true })} />
          <input {...register("imgCover", { required: true })} />
          <input type="submit" value="Add" />
        </form>
      ) : (
        <h1>Loading</h1>
      )}
    </>
  );
};

export default BookAdd;
