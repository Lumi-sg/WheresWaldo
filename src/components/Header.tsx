import "../styles/Header.css";
import { characters } from "./Characters";

const Header = () => {
	return (
		<div className="Header">
			<div className="Characters">
				{characters.map((character, index) => (
					<img
						key={index}
						className="Image"
						src={character.src}
						alt={character.alt}
					/>
				))}
			</div>
		</div>
	);
};

export default Header;
