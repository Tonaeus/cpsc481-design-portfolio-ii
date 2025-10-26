import { useEffect } from "react";

const Payment = () => {
  useEffect(() => {
    document.title = `${import.meta.env.VITE_APP_NAME_ABBREV} | Payment`;
  }, []);
  return <div>Payment</div>;
};

export default Payment;
