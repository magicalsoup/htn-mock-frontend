"use client"

import useSession from "@/session/use-session"
import { Landing } from "@/components/home/Landing"
import { EventsContextProvider } from "@/components/events-context/EventContext"

export default function Home() {
    const { session, isLoading, logout } = useSession()

    if (isLoading) {
      return (
        <div>Loading</div>
      )
    }

    return (
       <EventsContextProvider>
          <Landing/>
       </EventsContextProvider>
    )
}