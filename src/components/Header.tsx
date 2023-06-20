import "../styles/Header.css";
import Timer from "./Timer";
import { Character } from "./Characters";
import { useEffect } from "react";
import LOGIN from "./LOGIN";

type HeaderProps = {
	time: number;
	setTime: React.Dispatch<React.SetStateAction<number>>;
	characterArray: Character[];
	setCharacterArray: React.Dispatch<React.SetStateAction<Character[]>>;
	firstName: string | null;
	setFirstName: React.Dispatch<React.SetStateAction<string | null>>;
	isLoggedIn: boolean;
	setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

export type TimerProps = {
	time: number;
	setTime: React.Dispatch<React.SetStateAction<number>>;
};

const Header = ({
	time,
	setTime,
	characterArray,
	firstName,
	setFirstName,
	isLoggedIn,
	setIsLoggedIn,
}: HeaderProps) => {
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
				firstName={firstName}
				setFirstName={setFirstName}
			/>
		</div>
	);
};

export default Header;
