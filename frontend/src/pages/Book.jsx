import { useEffect } from "react";

const Book = () => {
  useEffect(() => {
    document.title = "Book";
  }, []);
  return <div>Book</div>;
};

export default Book;
