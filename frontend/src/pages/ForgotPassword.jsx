import { useEffect } from "react";

const ForgotPassword = () => {
  useEffect(() => {
    document.title = `${import.meta.env.VITE_APP_NAME_ABBREV} | Forgot Password`;
  }, []);
  return <div>ForgotPassword</div>;
};

export default ForgotPassword;
