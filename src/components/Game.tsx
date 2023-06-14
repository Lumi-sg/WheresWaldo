import MeleeCastImage from "../assets/MeleeCast.png";

const Game = () => {
	return (
		<div className="Game">
			<div className="MeleeCastImage">
				<img
					className="Image"
					src={MeleeCastImage}
					alt="MeleeCast"
				/>
			</div>
		</div>
	);
};

export default Game;
