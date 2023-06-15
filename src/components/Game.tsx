import React, { useState } from "react";
import MeleeCastImage from "../assets/MeleeCast.png";
import { characters } from "./Characters";
import "../styles/Game.css";

interface BoxPosition {
	x: number;
	y: number;
}

const Game: React.FC = () => {
	const [boxPosition, setBoxPosition] = useState<BoxPosition>({ x: 0, y: 0 });
	const [showBox, setShowBox] = useState(false);
	const [clickedDiv, setClickedDiv] = useState<string | null>("");

	const handleBoxClick = (e: React.MouseEvent<HTMLDivElement>) => {
		const boxElement = document.querySelector(".CharacterBox") as HTMLElement;
		if (boxElement && boxElement.contains(e.target as Node)) {
			// Click originated from within > do nothing
			return;
		}
		const clickedPosition: BoxPosition = {
			x: e.clientX,
			y: e.clientY,
		};
		setBoxPosition(clickedPosition);

		setShowBox(true);
		let clickedBox = e.target as HTMLElement;
		let clickedBoxData = clickedBox.getAttribute("datatype");
		setClickedDiv(clickedBoxData);
	};

	const handleCharacterSelection = (e: React.MouseEvent<HTMLButtonElement>, character: any) => {
		console.log(clickedDiv);
		if (clickedDiv) {
			if (clickedDiv === character.alt) {
				console.log("Matched!");
				character.hasBeenFound = true;
				character.className = "ImageFound";
				setShowBox(false);
				console.table(character);
			}
		} else {
			console.log("No match was made!");
			setShowBox(false);
		}
	};

	const calculateBoxPosition = (): React.CSSProperties => {
		const { x, y } = boxPosition;
		const boxWidth = 200; // Adjust this value as per your requirement
		const boxHeight = 200; // Adjust this value as per your requirement
		const windowWidth = window.innerWidth;
		const windowHeight = window.innerHeight;

		let left = x;
		let top = y;

		// Calculate the available space on both sides of the clicked position
		const spaceRight = windowWidth - x;
		const spaceLeft = x;

		// Check if there is enough space on the right side to open the box
		if (spaceRight >= boxWidth) {
			left = x + 100; // Open the box to the right with a small offset
		}
		// Check if there is enough space on the left side to open the box
		else if (spaceLeft >= boxWidth) {
			left = x - boxWidth - 100; // Open the box to the left with a small offset
		}

		// Adjust the position if the box exceeds the window boundaries vertically
		if (top + boxHeight > windowHeight) {
			top = windowHeight - boxHeight;
		} else if (top < 0) {
			top = 0;
		}

		return {
			left,
			top,
			zIndex: 9999, // Specify the desired z-index value
		};
	};

	return (
		<div className="Game">
			<div className="MeleeCastImage">
				<img
					className="CastImage"
					src={MeleeCastImage}
					alt="MeleeCast"
					onClick={handleBoxClick}
				/>
			</div>
			{showBox && (
				<div
					className="CharacterBox"
					style={calculateBoxPosition()}
				>
					{characters.map((character, index) => (
						<div
							className="ItemContainer"
							key={index}
						>
							<img
								className={character.className}
								src={character.src}
								alt={character.alt}
							/>
							<button
								key={index}
								disabled={character.hasBeenFound}
								onClick={(e) => handleCharacterSelection(e, character)}
							>
								{character.alt}
							</button>
						</div>
					))}
				</div>
			)}
			<div
				className="HiddenDiv Falco"
				onClick={handleBoxClick}
				datatype="Falco"
			></div>
			<div
				className="HiddenDiv Marth"
				onClick={handleBoxClick}
				datatype="Marth"
			></div>
			<div
				className="HiddenDiv Peach"
				onClick={handleBoxClick}
				datatype="Peach"
			></div>
		</div>
	);
};

export default Game;
