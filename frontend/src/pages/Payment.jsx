import { useEffect } from "react";

const Payment = () => {
  useEffect(() => {
    document.title = "Payment";
  }, []);
  return <div>Payment</div>;
};

export default Payment;
