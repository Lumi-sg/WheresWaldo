import "./App.css";
import "./styles/Reset.css";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Game from "./components/Game";
import Footer from "./components/Footer";

function App() {
	const [time, setTime] = useState<number>(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setTime((prevtime) => prevtime + 1);
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	
	return (
		<div className="App">
			<Header time={time} setTime={setTime}/>
			<Game />
			<Footer />
		</div>
	);
}

export default App;
