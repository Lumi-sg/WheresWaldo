import { auth, provider, signInWithPopup } from "../main";

type LOGINProps = {
	isLoggedIn: boolean;
	setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
	firstName: string | null;
	setFirstName: React.Dispatch<React.SetStateAction<string | null>>;
};

const LOGIN = ({ isLoggedIn, setIsLoggedIn, firstName, setFirstName }: LOGINProps) => {
	const handleLogin = () => {
		if (!isLoggedIn) {
			signInWithPopup(auth, provider).then((result) => {
				if (result) {
					const user = result.user;
					setFirstName(user.displayName ? user.displayName.split(" ")[0] : "");
					setIsLoggedIn(true);
				}
			});
		} else {
			setIsLoggedIn(false);
		}
	};

	return (
		<div className="LOGINContainer">
			<p className="UserGreeting">Hello, {isLoggedIn ? firstName : "Guest"}</p>
			<button
				className="LOGINButton"
				onClick={handleLogin}
			>
				{isLoggedIn ? "Logout" : "Login"}
			</button>
		</div>
	);
};

export default LOGIN;
