export interface Process {
  // ID created on init
  userID: string;
  
  // ID for firestore document
  processID: string;
  
  // Name of the process to be tracked
  processName: string;
  
  // time in seconds that the process is allowed to be ran
  timeLimit: number;
  //time in hours
  timeLimitH: number;
  //time in minutes
  timeLimitM: number;
  
  // minutes remaining, up to 3
  warning1?: number;
  warning2?: number;
  warning3?: number;
}
