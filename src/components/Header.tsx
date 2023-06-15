import "../styles/Header.css";
import Timer from "./Timer";
import { Character } from "./Characters";
import { useEffect } from "react";

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
	useEffect(() => {}, [characterArray]);
	return (
		<div className="Header">
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
			<Timer
				time={time}
				setTime={setTime}
			/>
		</div>
	);
};

export default Header;
