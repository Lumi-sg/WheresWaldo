import FalcoImage from "../assets/Falco.png";
import MarthImage from "../assets/Marth.png";
import PeachImage from "../assets/Peach.png";

interface Character {
	src: string;
	alt: string;
	hasBeenFound: boolean;
}

export const characters: Character[] = [
	{
		src: FalcoImage,
		alt: "Falco",
		hasBeenFound: false,
	},
	{
		src: MarthImage,
		alt: "Marth",
		hasBeenFound: false,
	},
	{
		src: PeachImage,
		alt: "Peach",
		hasBeenFound: false,
	},
];
