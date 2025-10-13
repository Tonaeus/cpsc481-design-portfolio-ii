import { useEffect } from "react";

const Reserve = () => {
  useEffect(() => {
    document.title = "Reserve";
  }, []);
  return <div>Reserve</div>;
};

export default Reserve;
