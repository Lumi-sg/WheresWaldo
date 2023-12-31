import React, { useEffect, useState, useRef } from "react";
import { formatTime } from "./FormatTime";
import "../styles/GameOver.css";
import { characters } from "../components/Characters";
import { Character } from "./Characters";
import { firestoreDB } from "../main";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { User as FirebaseUser } from "firebase/auth";
import foxShineGif from "../assets/foxshine.gif";

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
	const gameOverHasBeenSet = useRef(false);
	const [newData, setNewData] = useState<any[]>([]);
	const [hasDataBeenFetched, setHasDataBeenFetched] = useState(false);

	const handlePlayAgain = () => {
		setCharacterArray(characters);
		setTime(0);
		setAllCharactersFound(false);
		setIsGameOver(false);
		setHasDataBeenFetched(false);
		gameOverHasBeenSet.current = false;
	};

	const saveData = async () => {
		try {
			const firstName = user?.displayName?.split(" ")[0];
			const docRef = await addDoc(collection(firestoreDB, "scores"), {
				userID: user?.uid,
				firstName: firstName,
				emailAddress: user?.email,
				timeScored: formatTime(time),
				profilePicture: user?.photoURL,
			});
			console.log("Document written with ID: ", docRef.id);
			return docRef.id;
		} catch {
			console.log("Error adding document: ");
		}
	};

	const retrieveData = async () => {
		await getDocs(collection(firestoreDB, "scores")).then((querySnapshot) => {
			const newData: {
				id: string;
				timeScored: string;
				firstName: string;
				profilePicture: string;
			}[] = [];
			querySnapshot.forEach((doc) => {
				const data = doc.data();
				const { timeScored, firstName } = data;
				newData.push({
					id: doc.id,
					timeScored,
					firstName,
					profilePicture: data.profilePicture,
				});
			});
			newData.sort((a, b) => a.timeScored.localeCompare(b.timeScored)); // Sort newData by timeScored in ascending order
			setNewData(newData);
			setHasDataBeenFetched(true);
		});
	};

	//when game is over store best scores
	useEffect(() => {
		if (gameOverHasBeenSet.current) return;
		if (isGameOver) {
			const handleSaveDataAndRetrieve = async () => {
				try {
					const documentId = await saveData();
					await retrieveData();
					console.log("Data saved and retrieved. Document ID: ", documentId);
					// Additional logic after both saveData and retrieveData completion
				} catch (error) {
					console.log("Save data or retrieve data failed. Error: ", error);
					// Error handling or fallback logic
				}
			};
			handleSaveDataAndRetrieve();
			gameOverHasBeenSet.current = true;
		}
	}, [isGameOver]);

	return (
		<div className="GameOverModal">
			{hasDataBeenFetched ? (
				<div className="ModalContent">
					<h1>You Won!</h1>
					<span className="TimeDisplay">Your Time: {formatTime(time)}</span>
					<div className="Leaderboard">
						<span className="BestTime">Best Times</span>
						<div className="TimeListContainer">
							<ul className="TimeList">
								{newData
									.sort() // sort the times in ascending order
									.slice(0, 5) // display only the top 5 scores
									.map((item, index) => (
										<p
											className="Time"
											key={index}
										>
											<span className="Number">{index + 1}.</span>
											<span className="NameAndTime">
												<img
													className="ProfilePicture"
													src={`${item.profilePicture}`}
													alt="User Photo"
												/>

												<span className="FirstName">{item.firstName}:</span>
												{item.timeScored}
											</span>
										</p>
									))}
							</ul>
							<ul className="TimeList2">
								{newData
									.sort() // sort the times in ascending order
									.slice(5, 10) // display only the top 5 scores
									.map((item, index) => (
										<p
											className="Time"
											key={index}
										>
											<span className="Number">{index + 6}.</span>
											<span className="NameAndTime">
												<img
													className="ProfilePicture"
													src={`${item.profilePicture}`}
													alt="User Photo"
												/>
												<span className="FirstName">{item.firstName}:</span>
												{item.timeScored}
											</span>
										</p>
									))}
							</ul>
						</div>
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
			) : (
				<div className="loadingDiv">
					<img
						className="FoxShine"
						src={foxShineGif}
						alt="Fox Shine"
					/>
					<div className="Loading">Loading...</div>
				</div>
			)}
		</div>
	);

	// ...
};

export default GameOver;
