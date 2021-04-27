import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { POST } from "../../api/apiServices";

import "../../global.styles.css";

const CategoryAdd = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const history = useHistory();

  const onSubmit = (data) => {
    POST("categories", data)
      .then(
        () => alert("Success"),
        (err) => console.log(err)
      )
      .then(() => history.push("/categorymanage"));
  };

  return (
    <div style={{ width: "40vw", marginLeft: "15vw" }}>
      <h1>ADD CATEGORY</h1>
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
          <button type="submit" value="Add" >ADD</button>
        </div>
      </form>
    </div>
  );
};

export default CategoryAdd;
