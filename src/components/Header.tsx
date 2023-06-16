import "../styles/Header.css";
import Timer from "./Timer";
import { Character } from "./Characters";
import { useEffect, useState } from "react";
import LOGIN from "./LOGIN";

type HeaderProps = {
	time: number;
	setTime: React.Dispatch<React.SetStateAction<number>>;
	characterArray: Character[];
	setCharacterArray: React.Dispatch<React.SetStateAction<Character[]>>;
};

export type TimerProps = {
	time: number;
	setTime: React.Dispatch<React.SetStateAction<number>>;
};

const Header = ({ time, setTime, characterArray }: HeaderProps) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {}, [characterArray]);

	return (
		<div className="Header">
			<div className="TimerContainer">
				<Timer
					time={time}
					setTime={setTime}
				/>
			</div>
			<div className="Characters">
				{characterArray.map((character, index) => (
					<img
						key={index}
						className={character.className}
						src={character.src}
						alt={character.alt}
					/>
				))}
			</div>

			<LOGIN
				isLoggedIn={isLoggedIn}
				setIsLoggedIn={setIsLoggedIn}
			/>
		</div>
	);
};

export default Header;
