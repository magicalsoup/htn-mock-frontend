"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EventsList } from "@/components/home/EventsList"
import { SearchBar } from "@/components/home/SearchBar"


export function DayTabs({ eventDays } : { eventDays: string[]; }) {
    
    return (
        <div className="flex flex-col gap-y-8">
            <h1 className="text-3xl font-bold">Schedule</h1>
            <Tabs defaultValue={"0"} className="w-[700px]">
                <div className="flex justify-between">
                    {eventDays.length > 0 && <>
                        <TabsList className="py-6">
                            {eventDays.map((eventDay, id) => {
                                return <TabsTrigger className="text-lg" value={id.toString()} key={id}>{eventDay}</TabsTrigger>
                            })}
                        </TabsList>
                        <SearchBar/>
                     </>}
                </div>
                {eventDays.map((eventDay, id) => {
                    return <TabsContent value={id.toString()} key={id}>
                            <EventsList day={eventDay}></EventsList>
                        </TabsContent>
                    }   
                )}
            </Tabs>
        </div>
    )
}