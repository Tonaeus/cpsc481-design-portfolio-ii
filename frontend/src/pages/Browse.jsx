import { useEffect } from "react";

const Browse = () => {
  useEffect(() => {
    document.title = `${import.meta.env.VITE_APP_NAME_ABBREV} | Browse`;
  }, []);
  return <div>Browse</div>;
};

export default Browse;
