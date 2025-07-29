function formatTime(time) {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;

  let formattedSeconds = seconds < 10 ? "0" + seconds : seconds;

  return `${minutes}m:${formattedSeconds}s`;
}

export default formatTime;
