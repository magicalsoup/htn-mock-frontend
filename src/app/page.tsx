"use client"

import { Landing } from "../components/home/Landing"
import { EventsContextProvider } from "../components/events-context/EventContext"
import { Header } from "../components/home/Header"

export default function Home() {
    return (
      <>
        <Header/>
        <EventsContextProvider>
            <Landing/>
        </EventsContextProvider>
       </>
    )
}