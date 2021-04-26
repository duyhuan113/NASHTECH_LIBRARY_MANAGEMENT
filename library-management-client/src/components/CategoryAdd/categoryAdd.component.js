import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { POST } from "../../api/apiServices";

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
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name", { required: true })} />

        <input type="submit" value="Add" />
      </form>
    </>
  );
};

export default CategoryAdd;
