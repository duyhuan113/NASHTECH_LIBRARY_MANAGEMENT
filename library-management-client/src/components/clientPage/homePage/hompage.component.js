import { useEffect, useState } from "react";
import { GET } from "../../../api/apiServices";
import BookComponent from "../book/book.component";
import "./homepage.style.css";

const HomePageComponent = () => {
  const [bookData, setbookData] = useState(null);
  useEffect(() => {
    GET("books/all").then((res) => setbookData(res.data));
  }, []);

  console.log(bookData);
  return (
    <div className="wrap__container">
      {bookData && bookData.map((elm, i) => <BookComponent key={i} {...elm} />)}
    </div>
  );
};

export default HomePageComponent;
