import { TEvent } from "./types";

export type EventsContextType = {
    filteredEvents: TEvent[];
    events: TEvent[]; // events queried from the API
    currentEvent: TEvent | null;
    openModal: boolean;
    interestedEvents: TEvent[]
}

export enum EventContextActionType {
    INITIALIZE_EVENTS,
    SELECT_EVENT_AS_INTERESTED,
    DESELECT_EVENT_AS_INTERESTED,
    SET_CURRENT_EVENT,
    CHANGE_FILTERED_EVENTS,
}

export type EventsContextAction = {
    type: EventContextActionType
    events?: TEvent[]
    event?: TEvent | null
}