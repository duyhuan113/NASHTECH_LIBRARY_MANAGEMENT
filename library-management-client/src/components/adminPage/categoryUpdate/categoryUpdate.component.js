import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router";
import { GET_BY_ID, PUT } from "../../../api/apiServices";
const BookUpdate = () => {
  const [categoryData, setcategoryData] = useState(null);
  const { id } = useParams();
  const { register, handleSubmit, setValue } = useForm();

  const history = useHistory();

  useEffect(() => {
    GET_BY_ID("categories", id).then(
      (res) => setcategoryData(res.data),
      (err) => console.log(err)
    );
  }, []);

  useEffect(() => {
    if (categoryData) {
      setValue("name", categoryData.name);
    }
  }, [categoryData]);

  const onSubmit = (data) => {
    PUT("categories", id, data)
      .then(
        () => alert("Success"),
        (err) => console.log(err)
      )
      .then(() => history.push("/categorymanage"));
  };

  return (
    <>
      <h2>Category Update</h2>
      {categoryData ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="container">
            <label>
              <b>Name</b>
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              name="uname"
              {...register("name", { required: true })}
            />
            <button type="submit" value="Add">
              Update
            </button>
          </div>
        </form>
      ) : (
        <h1>Loading</h1>
      )}
    </>
  );
};

export default BookUpdate;
