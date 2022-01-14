export interface Process {
  // ID created on init
  userID: string;
  // Name of the process to be tracked
  processName: string;
  // time in seconds that the process is allowed to be ran
  timeLimit: number;
  // time in seconds/(minutes?) that a user will get warnings for remaining time
  warnings?: number[];
}
