export interface Limits {
  // ID created on init
  uid: string;
  // maximum time per week
  weeklyLimitH: number;
  weeklyLimitM: number;
  
  //maximum time per day
  monLimitH: number;
  monLimitM: number;
  
  tuesLimitH: number;
  tuesLimitM: number;
  
  wedLimitH: number;
  wedLimitM: number;
  
  thursLimitH: number;
  thursLimitM: number;
  
  friLimitH: number;
  friLimitM: number;
  
  satLimitH: number;
  satLimitM: number;
  
  sunLimitH: number;
  sunLimitM: number;
  
}