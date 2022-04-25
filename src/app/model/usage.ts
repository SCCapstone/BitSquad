export interface Usage {
    // ID created on init
    userID: string;
    
    // hours and mins used today
    dailyHours: number;
    dailyMins: number;
    
    // hours and mins used this week
    weeklyHours: number;
    weeklyMins: number;
    
    //month and day of last login
    lastLogin: string;
    
    //week number of last login
    lastLoginWeek: string;

}