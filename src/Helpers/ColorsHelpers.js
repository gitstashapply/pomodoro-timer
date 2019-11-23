import { POMODORO_MODES } from "./Constants";

export const setColor = mode => {
  switch (mode) {
    case POMODORO_MODES.work.id:
      return { primaryColor: "#FF1654", secondaryColor: "#ff576e" };
    case POMODORO_MODES.break.id:
      return {
        primaryColor: "#247BA0",
        secondaryColor: "#5490af"
      };
    case POMODORO_MODES.longBreak.id:
      return {
        primaryColor: "#70C1B3",
        secondaryColor: "#8acbbf"
      };

    default:
      return {
        primaryColor: "#70C1B3",
        secondaryColor: "#8acbbf"
      };
  }
};
