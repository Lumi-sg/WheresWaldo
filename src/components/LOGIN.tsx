import { auth, provider, signInWithPopup } from "../main";
import { User as FirebaseUser } from "firebase/auth";

type LOGINProps = {
	isLoggedIn: boolean;
	setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
	user: FirebaseUser | null;
	setUser: React.Dispatch<React.SetStateAction<FirebaseUser | null>>;
};

const LOGIN = ({ isLoggedIn, setIsLoggedIn, user, setUser }: LOGINProps) => {
	const handleLogin = () => {
		if (!isLoggedIn) {
			signInWithPopup(auth, provider).then((result) => {
				if (result) {
					const receivedUserData = result.user;
					setUser(receivedUserData);
					setIsLoggedIn(true);
				}
			});
		} else {
			setIsLoggedIn(false);
		}
	};

	return (
		<div className="LOGINContainer">
			<p className="UserGreeting">Hello, {isLoggedIn ? user?.displayName : "Guest"}</p>
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
