import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router";
import { GET, GET_BY_ID, PUT } from "../../api/apiServices";
const BookUpdate = () => {
  const [bookData, setBookData] = useState(null);
  const [categoryData, setcategoryData] = useState(null);
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const history = useHistory();
  useEffect(() => {
    GET_BY_ID("books", id).then(
      (res) => setBookData(res.data),
      (err) => console.log(err)
    );

    GET("categories/all").then(
      (res) => setcategoryData(res.data),
      (err) => console.log(err)
    );
  }, []);

    useEffect(() => {
        if(categoryData && bookData){
            setValue("title",bookData.title)
            setValue("quantity",bookData.quantity)
            setValue("imgCover", bookData.imgCover);
        } 
        
    }, [categoryData]);

  const onSubmit = (data) => {
    PUT("books",id, data)
      .then(
        () => alert("Success"),
        (err) => console.log(err)
      )
      .then(() => history.push("/bookmanage"));
  };

  console.log(bookData, categoryData);

  return (
    <>
      {bookData && categoryData ? (
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
          <input {...register("quantity", { required: true })} />
          <input {...register("imgCover", { required: true })} />
          <input type="submit" value="Update" />
        </form>
      ) : (
        <h1>Loading</h1>
      )}
    </>
  );
};

export default BookUpdate;
