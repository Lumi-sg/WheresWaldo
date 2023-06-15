export const formatTime = (time: number): string => {
    const minutes: number = Math.floor(time / 60);
    const seconds: number = time % 60;

    return `${padTime(minutes)}:${padTime(seconds)}`;
};

const padTime = (value: number): string => {
    return value.toString().padStart(2, "0");
};