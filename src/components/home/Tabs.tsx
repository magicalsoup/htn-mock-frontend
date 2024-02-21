"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EventsList } from "./EventList"
import { SearchBar } from "./SearchBar"


export function DayTabs({ eventDays, startDay } : 
    { eventDays: string[]; startDay: string }) {
    
    return (
        <div className="flex flex-col gap-y-8">
            <h1 className="text-3xl font-bold">Schedule</h1>
            <Tabs defaultValue={startDay} className="w-[700px]">
                <div className="flex justify-between">
                    <TabsList>
                        {eventDays.map((eventDay, id) => {
                            return <TabsTrigger className="text-lg" value={eventDay} key={id}>{eventDay}</TabsTrigger>
                        })}
                    </TabsList>
                    <SearchBar/>
                </div>
                {eventDays.map((eventDay, id) => {
                    return <TabsContent value={eventDay} key={id}>
                            <EventsList day={eventDay}></EventsList>
                        </TabsContent>
                    }   
                )}
            </Tabs>
        </div>
    )
}