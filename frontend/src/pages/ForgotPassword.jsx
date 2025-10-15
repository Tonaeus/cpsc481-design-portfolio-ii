import { useEffect } from "react";

const ForgotPassword = () => {
  useEffect(() => {
    document.title = "ForgotPassword";
  }, []);
  return <div>ForgotPassword</div>;
};

export default ForgotPassword;
