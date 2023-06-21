import { auth, provider, signInWithPopup } from "../main";
import { User as FirebaseUser } from "firebase/auth";
import { characters } from "./Characters";
import { Character } from "./Characters";

type LOGINProps = {
	isLoggedIn: boolean;
	setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
	user: FirebaseUser | null;
	setUser: React.Dispatch<React.SetStateAction<FirebaseUser | null>>;
	setCharacterArray: React.Dispatch<React.SetStateAction<Character[]>>;
	setAllCharactersFound: React.Dispatch<React.SetStateAction<boolean>>;
};

const LOGIN = ({ isLoggedIn, setIsLoggedIn, user, setUser, setCharacterArray, setAllCharactersFound }: LOGINProps) => {
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
			setCharacterArray(characters);
			setAllCharactersFound(false);
		}
	};

	return (
		<div className="LOGINContainer">
			<p className="UserGreeting">
				Hello, {isLoggedIn ? user?.displayName?.split(" ")[0] : "Guest"}
			</p>
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
