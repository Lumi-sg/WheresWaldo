import "../styles/Timer.css";
import { TimerProps } from "./Header";
import { formatTime } from "./FormatTime";

function Timer({ time }: TimerProps) {
	return <div className="Timer">{formatTime(time)}</div>;
}

export default Timer;
