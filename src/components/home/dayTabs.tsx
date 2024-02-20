"use client"

import { TEvent } from "@/app/schema/types"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EventsList } from "@/components/home/eventsList"

import { useEffect, useState } from "react"

export function DayTabs({events, eventDays, startDay} : 
    {events: TEvent[]; eventDays: string[]; startDay: string}) {

 


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
                            <EventsList day={eventDay} events={events}></EventsList>
                        </TabsContent>
                    }   
                )}
            </Tabs>
         
        </>
    )
}