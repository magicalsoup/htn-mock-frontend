import { TEvent } from "./types";

export type EventsContextType = {
    filteredEvents: TEvent[];
    events: TEvent[]; // events queried from the API
    currentEvent: TEvent | null;
    openModal: boolean;
}

export enum EventContextActionType {
    INITIALIZE_EVENTS
}

export type EventsContextAction = {
    type: EventContextActionType
    events?: TEvent[]
}