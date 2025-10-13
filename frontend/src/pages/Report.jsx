import { useEffect } from "react";

const Report = () => {
  useEffect(() => {
    document.title = "Report";
  }, []);
  return <div>Report</div>;
};

export default Report;
