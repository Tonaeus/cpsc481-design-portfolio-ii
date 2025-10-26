import { useEffect } from "react";

const Book = () => {
  useEffect(() => {
    document.title = `${import.meta.env.VITE_APP_NAME_ABBREV} | Book`;
  }, []);
  return <div>Book</div>;
};

export default Book;
