"use client"

import { useEffect, useState } from "react"
import { TEvent } from "../schema/types"

import { EventsList } from "@/components/home/eventsList"
import { getDayOfWeek } from "@/lib/format"
import { DayTabs } from "@/components/home/dayTabs"
import useSession from "@/session/use-session"

const API_ENDPOINT = `https://api.hackthenorth.com/v3/`

async function getEvents() {
    const req = `${API_ENDPOINT}/events`
    const events = await fetch(req).then(res => res.json())
    return events
}

export default function Home() {
    const { session, isLoading } = useSession()
    const [events, setEvents] = useState<TEvent[]>([])
    const [eventDays, setEventDays] = useState<string[]>([])
    const [startDay, setStartDay] = useState<string>("Tuesday")

    useEffect(() => {
        async function fetchEvents() {
            const fetchedEvents = (await getEvents()).sort((a: TEvent, b: TEvent) => {
              if (a.start_time < b.start_time) { // sort events by start time
                return -1;
              }
              return 1;
            });
            setEvents([...fetchedEvents]);
            console.log(fetchedEvents)
          }
          fetchEvents()
          
    }, [])

    useEffect(() => {
        const newEventDays = Array.from(new Set (events.map((event) => {
            return getDayOfWeek(event.start_time)
        })))
        setEventDays(newEventDays)
        setStartDay(newEventDays[0])
    }, [events])

    return (
        <main className="h-screen w-screen">
            <div className="flex flex-col py-32 px-32">
                <h1>Username: {session.username} isLoggedin: {JSON.stringify(session.isLoggedIn)}</h1>
                <div className="flex">
                    <DayTabs events={events} eventDays={eventDays} startDay={startDay}/>
                </div>
            </div>
        </main>
    )
}