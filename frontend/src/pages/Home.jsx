import { useEffect } from "react";

const Home = () => {
	useEffect(() => {
		document.title = `${import.meta.env.VITE_APP_NAME_ABBREV} | Home`;
	}, []);
	return <div>Home</div>;
};

export default Home;
