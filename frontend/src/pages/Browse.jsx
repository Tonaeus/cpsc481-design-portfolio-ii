import { useEffect } from "react";

const Browse = () => {
  useEffect(() => {
    document.title = "Browse";
  }, []);
  return <div>Browse</div>;
};

export default Browse;
