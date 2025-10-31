export default function formatSeconds(totalSeconds) {
    if (totalSeconds < 60) {
        return totalSeconds + " second" + (totalSeconds !== 1 ? "s" : "");
    }

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return (
        minutes +
        " minute" + (minutes !== 1 ? "s" : "") +
        " and " +
        seconds +
        " second" + (seconds !== 1 ? "s" : "")
    );
}