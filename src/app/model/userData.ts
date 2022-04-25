export interface userData{
  //userID
  uid:string;
  
  //total time spent per process in seconds
  data:Map<String,Number>;
  
  //total time spent on app in seconds
  total:Number
}