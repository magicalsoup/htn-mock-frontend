"use client"

import { TEvent } from "@/app/schema/types";
import { getDayOfWeek } from "@/lib/format";
import { Event } from "@/components/home/Event"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
import { useEffect, useState } from "react";
import { useEventsState } from "../events-context/EventContext";
import { Button } from "../ui/button";
import useSession from "@/session/use-session";
import { getRelatedEvents } from "@/lib/event-data";
import {
    Collapsible,
    CollapsibleContent,
  } from "@/components/ui/collapsible"

import { Badge } from "@/components/ui/badge"

export function EventsList({day} : {day: string;}) {
    const [currentEvent, setCurrentEvent] = useState<TEvent | null>(null)
    const [relatedEvents, setRelatedEvents] = useState<TEvent[] | null>(null)
    const [openModal, setOpenModal] = useState(false)
    const { session } = useSession()
    const eventsState = useEventsState()

    useEffect(() => {
        async function fetchRelatedEvents() {
            if (currentEvent !== null && openModal) {
                const fetchedEvents = await getRelatedEvents(currentEvent, session.isLoggedIn);
                setRelatedEvents(fetchedEvents);
            }
        }
        fetchRelatedEvents();
        
    }, [currentEvent, openModal])

    return (
        <div className="flex flex-col gap-y-4">
            { eventsState.filteredEvents &&  eventsState.filteredEvents.map((event, id) => {
                if (getDayOfWeek(event.start_time) === day) {
                    return <div key={id} onClick={() => {
                            setOpenModal(true)
                            setCurrentEvent(event)
                        }}>
                        <Event event={event}/>
                    </div>
                }
            })}
            {openModal && <Dialog open={openModal} onOpenChange={setOpenModal}>
                <DialogContent className="sm:max-w-xl p-12">
                    <DialogHeader>
                        <div className="flex gap-x-4">
                            <DialogTitle className="">{currentEvent?.name}</DialogTitle>
                            <Badge>{currentEvent?.event_type}</Badge>
                        </div>
                    </DialogHeader>
                    <DialogDescription>
                        {currentEvent?.description}
                    </DialogDescription>
                    
                    <Collapsible open={true}>
                        <h1 className="">You should also check out </h1>
                        <CollapsibleContent className="flex flex-col items-start">
                            {relatedEvents?.map((event, id: number) => {
                                return <Button variant="link" className="p-0" key={id} onClick={() => {
                                    setOpenModal(true)
                                    setCurrentEvent(event)
                                }}>{event.name}</Button>
                            })}
                        </CollapsibleContent>
                    </Collapsible>
                    
                </DialogContent>
            </Dialog>}
        </div>
    )
}