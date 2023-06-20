import "../styles/WelcomeScreen.css";

const WelcomeScreen = () => {
	return (
		<div className="WelcomeScreenContainer">
			<div className="Instructions">
				<h2 className="InstructionsLabel">Instructions </h2>
				<ul className="InstructionsList">
					<li>Find the characters shown above in the proceeding image.</li>
					<li>Click them and select which character you've found.</li>
					<li>If you're correct, that character will be grayed out.</li>
					<li>Once all of them have been found, the game will end.</li>
					<li className="LoginInstruction">Login to start the game and good luck!</li>
				</ul>
			</div>
		</div>
	);
};

export default WelcomeScreen;
