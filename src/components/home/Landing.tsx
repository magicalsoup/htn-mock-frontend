"use client"

import { useEffect, useState } from "react"
import { TEvent } from "@/schema/types"
import { getDayOfWeek } from "@/lib/format"
import { DayTabs } from "@/components/home/DayTabs"
import useSession from "@/session/use-session"
import { useEventsDispatch } from "@/lib/events-context/EventContext"
import { EventContextActionType } from "@/schema/events-context-types"
import { Profile } from "@/components/home/Profile"
import { Loading } from "@/components/home/Loading"
import { getEvents } from "@/lib/event-data"

export function Landing () {
    const { session, isLoading } = useSession()
    
    const eventsDispatch = useEventsDispatch()
 
    const [events, setEvents] = useState<TEvent[]>([])
    const [eventDays, setEventDays] = useState<string[]>([])


    useEffect(() => {
        async function fetchEvents() {
            const fetchedEvents = (await getEvents()).sort((a: TEvent, b: TEvent) => {
              if (a.start_time < b.start_time) { // sort events by start time
                return -1;
              }
              return 1;
            }).filter((event: TEvent) => event.permission === "public" || session.isLoggedIn)
            
            setEvents([...fetchedEvents])

            eventsDispatch({
                type: EventContextActionType.INITIALIZE_EVENTS,
                events: [...fetchedEvents]
            })
          }
          fetchEvents()
    }, [session, eventsDispatch])

    useEffect(() => {
        const newEventDays = Array.from(new Set (events.map((event) => {
            return getDayOfWeek(event.start_time)
        })))
        setEventDays(newEventDays)
    }, [events])

    if (isLoading) {
        return <Loading/>
    }

    return (
        <main className="h-full w-screen bg-background">
            <div className="flex flex-col items-center py-32 px-32 gap-y-8"> 
                <div className="flex gap-x-16">
                    <DayTabs eventDays={eventDays}/>
                    <Profile />
                </div>
            </div>
        </main>
    )
}