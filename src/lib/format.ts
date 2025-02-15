import { TEventType } from "@/schema/types";
import moment from 'moment'
const daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["Janurary", "Februrary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

// returns a string of the unix time stamp in a 12 hour clock, eg 8:00 pm
// export function formatUnixTimeStamp(unix_timestamp: number) { 
//     const date = new Date(unix_timestamp);

//     // const month = months[date.getMonth()];
//     const day = date.getDay();
//     // const dayOfWeek = daysOfTheWeek[date.getDay()];
//     let suffix = "AM";
//     let hours = date.getHours();

//     if(hours >= 12) {
//         hours -= 12;
//         suffix = "PM";
//     }

//     const minutes = "0" + date.getMinutes();

//     return `${day} ${hours}:${minutes.substr(-2)} ${suffix}`;
// }

// wordOrNumber = true means formats as a word, false means it formats as a number
export function formatUnixTimeStamp(unix_timestamp: number, wordOrNumber: boolean) {
    let d = new Date(unix_timestamp);
    let myDatetimeFormat = wordOrNumber ? "MMMM d, hh:mm a" : "MMM d, hh:mm a";    
    let myDatetimeString = moment(d).format(myDatetimeFormat);
    return myDatetimeString;
    ///console.log(myDatetimeString); // gives me "2016-03-22 12:00:00 am EDT"
    
}

// returns a formated interval
export function formatTimeInterval(start_time:number, end_time:number, wordOrNumber: boolean) {

    // const start_date = new Date(start_time);
    // // const end_date = new Date(end_time);

    // // const month = months[start_date.getMonth()]; // its sane to assume the event happens in the same month

    return `${formatUnixTimeStamp(start_time, wordOrNumber)} to ${formatUnixTimeStamp(end_time, wordOrNumber)}`;
}

export function getDayOfWeek(start_time:number) {
    const date = new Date(start_time);
    const start_day = date.getDay();
    return daysOfTheWeek[start_day];
}

export function formatEventType(eventType: TEventType) {
    switch (eventType) {
        case "tech_talk": {
            return "Tech Talk"
        }
        case "workshop":{
            return 'Workshop'
        }
        case "activity":{
            return 'Activity'
        }
        default: {
            return eventType
        }
    }
}