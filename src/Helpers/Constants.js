export const POMODORO_CICLES = [
  "work",
  "break",
  "longBreak",
  "work",
  "break",
  "work",
  "break",
  "work",
  "longBreak"
];

export const POMODORO_MODES = {
  longBreak: { id: "longBreak", timer: 25 * 60, title: "Long break" },
  work: { id: "work", timer: 5 * 60, title: "Work" },
  break: { id: "break", timer: 5 * 60, title: "Break" }
};
