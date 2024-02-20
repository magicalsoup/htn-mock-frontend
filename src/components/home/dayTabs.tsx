"use client"

import { TEvent } from "@/app/schema/types"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EventsList } from "@/components/home/EventsList"

import { useEffect, useState } from "react"
import { useEventsState } from "../events-context/EventContext"

export function DayTabs({ eventDays, startDay } : 
    { eventDays: string[]; startDay: string }) {

    const eventsState = useEventsState()
    const events: TEvent[] = eventsState.events
    
    return (
        <>
            <Tabs defaultValue={startDay} className="w-[768px]">
                <TabsList>
                    {eventDays.map((eventDay, id) => {
                        return <TabsTrigger value={eventDay} key={id}>{eventDay}</TabsTrigger>
                    })}
                </TabsList>
                {eventDays.map((eventDay, id) => {
                    return <TabsContent value={eventDay} key={id}>
                            <EventsList day={eventDay}></EventsList>
                        </TabsContent>
                    }   
                )}
            </Tabs>
         
        </>
    )
}