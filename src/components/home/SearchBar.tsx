"use client"

import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react";
import { useEventsDispatch, useEventsState } from "../events-context/EventContext";
import { EventContextActionType } from "@/schema/events-context-types";
import { formatEventType } from "@/lib/format";

export function SearchBar() {
  const [searchParam, setSearchParam] = useState("")
  const eventsState = useEventsState()
  const eventsDispatch = useEventsDispatch()

  useEffect(() => {
    if(eventsState.events) {
      const newFilteredEvents = [...eventsState.events].filter((event) => {
        if(searchParam === "") { // base case when nothing is being searched
          return true;
        }
        const regExp = new RegExp(searchParam, 'gi'); // if the string appears anywhere in the event name, case insensitive
        const match_name = event.name.match(regExp)
        const match_event_type = formatEventType(event.event_type).match(regExp)
        return (match_name && match_name.length !== 0) || 
          (match_event_type && match_event_type.length !== 0); // if found a match, then include it
      })
      eventsDispatch({
        type: EventContextActionType.CHANGE_FILTERED_EVENTS,
        events: newFilteredEvents,
      })
    }
  }, [searchParam, eventsState.events, eventsDispatch]);
  const handleChange = (e: any) => {
    setSearchParam(e.target.value)
  }
  return (
    <Input placeholder="Filter for an event" className="w-96" onChange={handleChange}/>
  )
}