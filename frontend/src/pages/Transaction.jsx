import { useEffect } from "react";

const Transaction = () => {
  useEffect(() => {
    document.title = "Transaction";
  }, []);
  return <div>Transaction</div>;
};

export default Transaction;
