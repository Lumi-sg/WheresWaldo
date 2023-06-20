import React, { useEffect, useState, useRef } from "react";
import { formatTime } from "./FormatTime";
import "../styles/GameOver.css";
import { characters } from "../components/Characters";
import { Character } from "./Characters";
import { firestoreDB } from "../main";
import { collection, addDoc, getDoc } from "firebase/firestore";
import { User as FirebaseUser } from "firebase/auth";

type GameOverProps = {
	time: number;
	setTime: React.Dispatch<React.SetStateAction<number>>;
	isGameOver: boolean;
	setIsGameOver: React.Dispatch<React.SetStateAction<boolean>>;
	setAllCharactersFound: React.Dispatch<React.SetStateAction<boolean>>;
	setCharacterArray: React.Dispatch<React.SetStateAction<Character[]>>;
	user: FirebaseUser | null;
};

const GameOver = ({
	time,
	setTime,
	isGameOver,
	setIsGameOver,
	setAllCharactersFound,
	setCharacterArray,
	user,
}: GameOverProps) => {
	const [bestTimes, setBestTimes] = useState<string[]>([]);
	const gameOverHasBeenSet = useRef(false);

	const handlePlayAgain = () => {
		setCharacterArray(characters);
		setTime(0);
		setAllCharactersFound(false);
		setIsGameOver(false);
		gameOverHasBeenSet.current = false;
	};

	const saveData = async () => {
		try {
			const docRef = await addDoc(collection(firestoreDB, "scores"), {
				userID: user?.uid,
				firstName: user?.displayName,
				emailAddress: user?.email,
				timeScored: formatTime(time),
			});
			console.log("Document written with ID: ", docRef.id);
		} catch {
			console.log("Error adding document: ");
		}
	};

	//when game is over store best scores
	useEffect(() => {
		if (gameOverHasBeenSet.current) return;
		if (isGameOver) {
			saveData();
			gameOverHasBeenSet.current = true;
		}
	}, [isGameOver]);


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
									<span>
										{user?.displayName}: {best}
									</span>
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
