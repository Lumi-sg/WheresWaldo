import MeleeCastImage from "../assets/MeleeCast.png";
import "../styles/Game.css";

const Game = () => {
	return (
		<div className="Game">
			<div className="MeleeCastImage">
				<img
					className="CastImage"
					src={MeleeCastImage}
					alt="MeleeCast"
				/>
			</div>
		</div>
	);
};

export default Game;
