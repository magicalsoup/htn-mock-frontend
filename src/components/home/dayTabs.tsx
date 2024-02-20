"use client"

import { TEvent } from "@/app/schema/types"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EventsList } from "@/components/home/eventsList"

export function DayTabs({events, eventDays, startDay} : 
    {events: TEvent[]; eventDays: string[]; startDay: string}) {
    return (
        <Tabs defaultValue={startDay} className="w-[400px]">
            <TabsList>
                {eventDays.map((eventDay) => {
                    return <TabsTrigger value={eventDay}>{eventDay}</TabsTrigger>
                })}
            </TabsList>
            {eventDays.map((eventDay) => {
                return <TabsContent value={eventDay}>
                        <EventsList day={eventDay} events={events}></EventsList>
                    </TabsContent>
                }   
            )}
        </Tabs>
    )
}