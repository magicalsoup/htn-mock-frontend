"use client"

import { useEffect, useState } from "react"
import { TEvent } from "../schema/types"

const API_ENDPOINT = `https://api.hackthenorth.com/v3/`

async function getEvents() {
    const req = `${API_ENDPOINT}/events`
    const events = await fetch(req).then(res => res.json())
    return events
}

export default function Home() {

    const [events, setEvents] = useState<TEvent[]>([])

    useEffect(() => {
        async function fetchEvents() {
            const fetchedEvents = (await getEvents()).sort((a: TEvent, b: TEvent) => {
              if (a.start_time < b.start_time) { // sort events by start time
                return -1;
              }
              return 1;
            });
            setEvents([...fetchedEvents]);
          }
          fetchEvents()
    }, [])

    

    return (
        <main>

        </main>
    )
}