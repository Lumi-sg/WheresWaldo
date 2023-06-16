type LOGINProps = {
	isLoggedIn: boolean;
	setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const LOGIN = ({ isLoggedIn, setIsLoggedIn }: LOGINProps) => {
	return (
		<div className="LOGINContainer">
			<p className="UserGreeting">Hello, {isLoggedIn ? "User" : "Guest"}</p>
			<button
				className="LOGINButton"
				onClick={() => setIsLoggedIn(!isLoggedIn)}
			>
				{isLoggedIn ? "Logout" : "Login"}
			</button>
		</div>
	);
};

export default LOGIN;
