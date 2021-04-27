import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { GET } from "../../api/apiServices";
import BookComponent from "../book/book.component";

const HomePageComponent = () => {
  const [bookData, setbookData] = useState(null);
  useEffect(() => {
    GET("books/all").then((res) => setbookData(res.data));
  }, []);

  console.log(bookData);
  return (
    <>
      {bookData && bookData.map((elm, i) => <BookComponent key={i} {...elm} />)}
    </>
  );
};

export default HomePageComponent;
