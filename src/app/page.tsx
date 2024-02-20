"use client"

import { Landing } from "@/components/home/Landing"
import { EventsContextProvider } from "@/components/events-context/EventContext"

export default function Home() {

    return (
       <EventsContextProvider>
          <Landing/>
       </EventsContextProvider>
    )
}