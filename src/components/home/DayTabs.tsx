"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EventsList } from "@/components/home/EventsList"
import { SearchBar } from "@/components/home/SearchBar"


export function DayTabs({ eventDays } : { eventDays: string[]; }) {
    
    return (
        <div className="flex flex-col gap-y-8">
            <h1 className="text-lg md:text-xl lg:text-3xl font-bold">Schedule</h1>
            <Tabs defaultValue={"0"} className="w-full md:w-[500px] lg:w-[700px]">
                {eventDays.length > 0 && <div className="flex flex-col gap-y-2 md:flex-row md:justify-between">
                    <TabsList className="py-6">
                        {eventDays.map((eventDay, id) => {
                            return <TabsTrigger className="text-sm md:text-md lg:text-lg" value={id.toString()} key={id}>{eventDay}</TabsTrigger>
                        })}
                    </TabsList>
                    <SearchBar/>
                    </div>}
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