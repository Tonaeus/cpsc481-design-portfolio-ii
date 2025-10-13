import { useEffect } from "react";

const History = () => {
	useEffect(() => {
		document.title = "History";
	}, []);
	return <div>History</div>;
};

export default History;
