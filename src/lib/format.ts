import { TEventType } from "@/schema/types";

const daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["Janurary", "Februrary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]


// returns a string of the unix time stamp in a 12 hour clock, eg 8:00 pm
export function formatUnixTimeStamp(unix_timestamp: number) { 
    const date = new Date(unix_timestamp);

    // const month = months[date.getMonth()];
    // const day = date.getDate();
    // const dayOfWeek = daysOfTheWeek[date.getDay()];
    let suffix = "AM";
    let hours = date.getHours();

    if(hours >= 12) {
        hours -= 12;
        suffix = "PM";
    }

    const minutes = "0" + date.getMinutes();

    return `${hours}:${minutes.substr(-2)} ${suffix}`;
}

// returns a formated interval
export function formatTimeInterval(start_time:number, end_time:number) {

    // const start_date = new Date(start_time);
    // // const end_date = new Date(end_time);

    // // const month = months[start_date.getMonth()]; // its sane to assume the event happens in the same month

    return `${formatUnixTimeStamp(start_time)} to ${formatUnixTimeStamp(end_time)}`;
}

export function getDayOfWeek(start_time:number) {
    const date = new Date(start_time);
    const start_day = date.getDay();
    return daysOfTheWeek[start_day];
}

export function formatEventType(eventType: TEventType) {
    switch (eventType) {
        case "tech_talk": {
            return "techtalk"
        }
        default: {
            return eventType
        }
    }
}