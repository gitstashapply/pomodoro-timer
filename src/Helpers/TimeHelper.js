export const convertMillisToString = ms => {
  const minutes = Math.floor(ms / 60);
  const seconds = ((ms % 60) / 1).toFixed(0);

  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
};
