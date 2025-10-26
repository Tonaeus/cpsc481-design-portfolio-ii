import { useEffect } from "react";

const Reserve = () => {
  useEffect(() => {
    document.title = `${import.meta.env.VITE_APP_NAME_ABBREV} | Reserve`;
  }, []);
  return <div>Reserve</div>;
};

export default Reserve;
