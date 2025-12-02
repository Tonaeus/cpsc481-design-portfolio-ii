import { useEffect } from "react";
import Browse from "./Browse";
import Navbar from "../components/Navbar";

const Home = () => {
	useEffect(() => {
		document.title = `${import.meta.env.VITE_APP_NAME_ABBREV} | Home`;
	}, []);
	return (
		<>
			<Navbar />
			<Browse />
		</>
	);
		
};

export default Home;
