import { TEvent } from "./types";

export type EventsContextType = {
    filteredEvents: TEvent[];
    events: TEvent[]; // events queried from the API
    currentEvent: TEvent | null;
    openModal: boolean;
}

export enum EventContextActionType {
    INITIALIZE_EVENTS,
    SELECT_EVENT_AS_INTERESTED
}

export type EventsContextAction = {
    type: EventContextActionType
    events?: TEvent[]
    event?: TEvent
}