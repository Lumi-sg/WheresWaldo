import "./App.css";
import "./styles/Reset.css";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Game from "./components/Game";
import Footer from "./components/Footer";
import GameOver from "./components/GameOver";
import { Character } from "./components/Characters";
import { characters } from "./components/Characters";
import WelcomeScreen from "./components/WelcomeScreen";

function App() {
	const [time, setTime] = useState<number>(0);
	const [characterArray, setCharacterArray] = useState<Character[]>(characters);
	const [allCharactersFound, setAllCharactersFound] = useState(false);
	const [isGameOver, setIsGameOver] = useState(false);
	const [firstName, setFirstName] = useState<string | null>("");
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		if (isLoggedIn) {
			const timer = setInterval(() => {
				setTime((prevtime) => prevtime + 1);
			}, 1000);

			if (allCharactersFound) {
				clearInterval(timer);
			}

			return () => clearInterval(timer);
		}
	}, [allCharactersFound, isGameOver, isLoggedIn]);

	useEffect(() => {
		if (characterArray.every((character) => character.hasBeenFound)) {
			setAllCharactersFound(true);
			setIsGameOver(true);
		}
	}, [characterArray]);

	return (
		<div className="App">
			<Header
				time={time}
				setTime={setTime}
				characterArray={characterArray}
				setCharacterArray={setCharacterArray}
				firstName={firstName}
				setFirstName={setFirstName}
				isLoggedIn={isLoggedIn}
				setIsLoggedIn={setIsLoggedIn}
			/>
			{isLoggedIn ? (
				<Game
					characterArray={characterArray}
					setCharacterArray={setCharacterArray}
				/>
			) : (
				<WelcomeScreen />
			)}

			{isGameOver && (
				<GameOver
					time={time}
					setTime={setTime}
					isGameOver={isGameOver}
					setIsGameOver={setIsGameOver}
					setAllCharactersFound={setAllCharactersFound}
					setCharacterArray={setCharacterArray}
					firstName={firstName}
				/>
			)}
			<Footer />
		</div>
	);
}

export default App;
