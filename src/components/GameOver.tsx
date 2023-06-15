import React from "react";
import { formatTime } from "./FormatTime";
import "../styles/GameOver.css";

type GameOverProps = {
	time: number;
	setTime: React.Dispatch<React.SetStateAction<number>>;
	setIsGameOver: React.Dispatch<React.SetStateAction<boolean>>;
};

const times = Object.values(localStorage).filter((value) => typeof value === "string");

const GameOver = ({ time, setTime, setIsGameOver }: GameOverProps) => {
	return (
		<div className="GameOverModal">
			<div className="ModalContent">
				<h1>You Won!</h1>
				<span className="TimeDisplay">Your Time: {formatTime(time)}</span>
				<div className="Leaderboard">
					Best Times:
					<ul className="TimeList">
						{times.map((time, index) => {
							return (
								<li
									className="Time"
									key={index}
								>
									{time.slice(1, -1)}
								</li>
							);
						})}
					</ul>
				</div>
				<div className="buttonDiv">
					<button className="PlayAgainButton">Play Again?</button>
				</div>
			</div>
		</div>
	);
};

export default GameOver;
