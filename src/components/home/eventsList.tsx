"use client"

import { TEvent } from "@/app/schema/types";
import { getDayOfWeek } from "@/lib/format";
import { Event } from "@/components/home/Event"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
import { useEffect, useState } from "react";
import { useEventsState } from "../events-context/EventContext";
import { Button } from "../ui/button";
import useSession from "@/session/use-session";
import { getRelatedEvents } from "@/lib/event-data";


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
                        <DialogTitle className="">{currentEvent?.name}</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                        {currentEvent?.description}
                    </DialogDescription>
                    
                    {relatedEvents?.map((event) => {
                        return <Button variant="link" onClick={() => {
                            setOpenModal(true)
                            setCurrentEvent(event)
                        }}>{event.name}</Button>
                    })}
                    
                </DialogContent>
            </Dialog>}
        </div>
    )
}