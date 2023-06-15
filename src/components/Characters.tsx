import FalcoImage from "../assets/Falco.png";
import MarthImage from "../assets/Marth.png";
import PeachImage from "../assets/Peach.png";

export interface Character {
	className: string;
	src: string;
	alt: string;
	hasBeenFound: boolean;
}

export const characters: Character[] = [
	{
		className: "Image",
		src: FalcoImage,
		alt: "Falco",
		hasBeenFound: false,
	},
	{
		className: "Image",
		src: MarthImage,
		alt: "Marth",
		hasBeenFound: false,
	},
	{
		className: "Image",
		src: PeachImage,
		alt: "Peach",
		hasBeenFound: false,
	},
];
