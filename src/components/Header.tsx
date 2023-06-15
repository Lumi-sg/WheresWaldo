import "../styles/Header.css";
import { characters } from "./Characters";
import Timer from "./Timer";

export type TimeProps = {
	time: number;
	setTime: React.Dispatch<React.SetStateAction<number>>;
};

const Header = ({ time, setTime }: TimeProps) => {
	return (
		<div className="Header">
			<div className="Characters">
				{characters.map((character, index) => (
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
