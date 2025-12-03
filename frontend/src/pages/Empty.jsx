import { useEffect } from "react";

const Empty = () => {
  useEffect(() => {
    document.title = `${import.meta.env.VITE_APP_NAME_ABBREV} | Empty`;
  }, []);
  return null;
};

export default Empty;
