import { useEffect } from "react";

const Report = () => {
  useEffect(() => {
    document.title = `${import.meta.env.VITE_APP_NAME_ABBREV} | Report`;
  }, []);
  return <div>Report</div>;
};

export default Report;
