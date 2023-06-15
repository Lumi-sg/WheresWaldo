import "./App.css";
import "./styles/Reset.css";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Game from "./components/Game";
import Footer from "./components/Footer";
import GameOver from "./components/GameOver";
import { Character } from "./components/Characters";
import { characters } from "./components/Characters";
import { formatTime } from "./components/FormatTime";

function App() {
	const [time, setTime] = useState<number>(0);
	const [characterArray, setCharacterArray] = useState<Character[]>(characters);
	const [allCharactersFound, setAllCharactersFound] = useState(false);
	const [isGameOver, setIsGameOver] = useState(false);

	useEffect(() => {
		const timer = setInterval(() => {
			setTime((prevtime) => prevtime + 1);
		}, 1000);

		if (allCharactersFound) {
			clearInterval(timer);
		}

		return () => clearInterval(timer);
	}, [allCharactersFound, isGameOver]);

	useEffect(() => {
		if (characterArray.every((character) => character.hasBeenFound)) {
			setAllCharactersFound(true);
			//save time to local storage
			localStorage.setItem("time", JSON.stringify(formatTime(time)));
			setIsGameOver(true);
		}
	}, [characterArray]);

	const restartGame = () => {
		// setCharacterArray(characters);
		// setTime(0);
		// setAllCharactersFound(false);
		// setIsGameOver(false);
	};

	return (
		<div className="App">
			<Header
				time={time}
				setTime={setTime}
				characterArray={characterArray}
				setCharacterArray={setCharacterArray}
			/>

			<Game
				characterArray={characterArray}
				setCharacterArray={setCharacterArray}
			/>
			{isGameOver && (
				<GameOver
					time={time}
					setTime={setTime}
					setIsGameOver={setIsGameOver}
				/>
			)}
			<Footer />
		</div>
	);
}

export default App;
