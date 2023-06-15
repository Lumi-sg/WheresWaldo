import React, { useEffect, useState } from "react";
import { formatTime } from "./FormatTime";
import "../styles/GameOver.css";
import { characters } from "../components/Characters";
import { Character } from "./Characters";

type GameOverProps = {
	time: number;
	setTime: React.Dispatch<React.SetStateAction<number>>;
	isGameOver: boolean;
	setIsGameOver: React.Dispatch<React.SetStateAction<boolean>>;
	setAllCharactersFound: React.Dispatch<React.SetStateAction<boolean>>;
	setCharacterArray: React.Dispatch<React.SetStateAction<Character[]>>;
};

const GameOver = ({
	time,
	setTime,
	isGameOver,
	setIsGameOver,
	setAllCharactersFound,
	setCharacterArray,
}: GameOverProps) => {
	const [bestTimes, setBestTimes] = useState<string[]>([]);

	const handlePlayAgain = () => {
		setCharacterArray(characters);
		setTime(0);
		setAllCharactersFound(false);
		setIsGameOver(false);
	};

	useEffect(() => {
		if (isGameOver) {
			const formattedTime = formatTime(time);
			const storedTimes = localStorage.getItem("bestTimes");
			if (storedTimes) {
				const times = JSON.parse(storedTimes);
				times.push(formattedTime);
				localStorage.setItem("bestTimes", JSON.stringify(times));
				setBestTimes(times);
			} else {
				localStorage.setItem("bestTimes", JSON.stringify([formattedTime]));
				setBestTimes([formattedTime]);
			}
		}
	}, [isGameOver, time]);

	useEffect(() => {
		const storedTimes = localStorage.getItem("bestTimes");
		if (storedTimes) {
			setBestTimes(JSON.parse(storedTimes));
		}
	}, []);
	return (
		<div className="GameOverModal">
			<div className="ModalContent">
				<h1>You Won!</h1>
				<span className="TimeDisplay">Your Time: {formatTime(time)}</span>
				<div className="Leaderboard">
					<span className="BestTime">Best Times</span>
					<ul className="TimeList">
						{bestTimes
							.filter((time, index, self) => self.indexOf(time) === index) // Remove duplicates
							.sort() // Sort the times in ascending order
							.slice(0, 5) // Display only the top 5 scores
							.map((best, index) => (
								<p
									className="Time"
									key={index}
								>
									<span className="Number">{index + 1}.</span>
									<span>{best}</span>
								</p>
							))}
					</ul>
				</div>
				<div className="buttonDiv">
					<button
						className="PlayAgainButton"
						onClick={handlePlayAgain}
					>
						Play Again?
					</button>
				</div>
			</div>
		</div>
	);

	// ...
};

export default GameOver;
