import "../styles/Header.css";
import Timer from "./Timer";
import { Character } from "./Characters";
import React, { useEffect } from "react";
import LOGIN from "./LOGIN";
import { User as FirebaseUser } from "firebase/auth";

type HeaderProps = {
	time: number;
	setTime: React.Dispatch<React.SetStateAction<number>>;
	characterArray: Character[];
	setCharacterArray: React.Dispatch<React.SetStateAction<Character[]>>;
	user: FirebaseUser | null;
	setUser: React.Dispatch<React.SetStateAction<FirebaseUser | null>>;
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
	user,
	setUser,
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
				user={user}
				setUser={setUser}
			/>
		</div>
	);
};

export default Header;
