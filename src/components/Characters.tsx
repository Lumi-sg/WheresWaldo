import FalcoImage from "../assets/Falco.png";
import MarthImage from "../assets/Marth.png";
import PeachImage from "../assets/Peach.png";

interface Character {
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
		className: "ImageFound",
		src: PeachImage,
		alt: "Peach",
		hasBeenFound: true,
	},
];
