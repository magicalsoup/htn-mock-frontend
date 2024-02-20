import { EventContextActionType, EventsContextAction, EventsContextType } from "@/app/schema/events-context-types";
import React, { Dispatch, createContext, useContext, useReducer } from "react";



const initialState: EventsContextType = {
    filteredEvents: [],
    events: [],
    currentEvent: null,
    openModal: false,
    interestedEvents: []
}

const EventsContext = createContext<EventsContextType>(initialState)
const EventsDispatchContext = createContext<Dispatch<EventsContextAction>>({} as Dispatch<EventsContextAction>)

export function EventsContextProvider({ children } : { children: React.ReactNode}) {
    const [eventsState, dispatch] = useReducer(EventsReducer, initialState)
    return (
        <EventsContext.Provider value={eventsState}>
            <EventsDispatchContext.Provider value={dispatch}>
                { children }
            </EventsDispatchContext.Provider>
        </EventsContext.Provider>
    )
}

export function useEventsState() {
    const eventsContext = useContext(EventsContext);
    if (!eventsContext) {
      throw new Error(
        "useEventsContext() has to be used within <EventsContext.Provider>"
      );
    }
    return eventsContext;
  }
  
export function useEventsDispatch() {
    const eventsDispatch = useContext(EventsDispatchContext);
    if (!eventsDispatch) {
      throw new Error(
        "useEventsDispatch() has to be used within <EventsTextDispatchContext.Provider>"
      );
    }
    return eventsDispatch;
  }
  
  function EventsReducer(
    oldState: EventsContextType,
    action: EventsContextAction
  ) {
    switch (action.type) {
        case EventContextActionType.INITIALIZE_EVENTS: {
            if (action.events === undefined) {
                return oldState
            }
            return {
                ...oldState,
                events: action.events,
                filteredEvents: action.events
            }
        }
        case EventContextActionType.SELECT_EVENT_AS_INTERESTED: {
          if (action.event === null || action.event === undefined) {
            return oldState
          }

          if (oldState.interestedEvents.includes(action.event)) {
            return oldState
          }

          return {
            ...oldState,
            interestedEvents: [...oldState.interestedEvents, action.event]
          }
        }
        case EventContextActionType.DESELECT_EVENT_AS_INTERESTED: {
          if (action.event === null || action.event === undefined) {
            return oldState
          }
          if (!oldState.interestedEvents.includes(action.event)) {
            return oldState;
          }
          return {
            ...oldState,
            interestedEvents: oldState.interestedEvents.filter(event => event != action.event)
          }
        }
        case EventContextActionType.SET_CURRENT_EVENT: {
          if (action.event === null || action.event === undefined) {
            return oldState
          }
          return {
            ...oldState,
            currentEvent: action.event
          }
        }
        
      default: {
        throw new Error("Unknown action " + action.type);
      }
    }
  }