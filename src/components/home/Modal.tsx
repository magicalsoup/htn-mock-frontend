"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast"
import { TEvent } from "@/app/schema/types";
import {
    Collapsible,
    CollapsibleContent,
  } from "@/components/ui/collapsible"

import { Badge } from "@/components/ui/badge"
import { Button } from "../ui/button";
import { getRelatedEvents } from "@/lib/event-data";
import useSession from "@/session/use-session";
import { useEventsDispatch, useEventsState } from "../events-context/EventContext";
import { EventContextActionType } from "@/app/schema/events-context-types";
import { formatEventType, formatTimeInterval } from "@/lib/format";
import { ToastAction } from "@radix-ui/react-toast";

export function Modal ({openModal, setOpenModal} : 
    { openModal: boolean; setOpenModal: Dispatch<SetStateAction<boolean>>}) {
    const { session } = useSession()
    const { toast } = useToast()
    const [currentEvent, setCurrentEvent] = useState<TEvent | null>(null)

    const eventsDispatch = useEventsDispatch()
    const eventsState = useEventsState()

    const [relatedEvents, setRelatedEvents] = useState<TEvent[] | null>(null)

    useEffect(() => {
        async function fetchRelatedEvents() {
            if (currentEvent !== null && openModal) {
                const fetchedEvents = await getRelatedEvents(currentEvent, session.isLoggedIn);
                setRelatedEvents(fetchedEvents);
            }
        }
        fetchRelatedEvents();
        
    }, [currentEvent, openModal])

    useEffect(() => {
        if (eventsState.currentEvent !== null) {
            setCurrentEvent(eventsState.currentEvent)
        }
    }, [eventsState.currentEvent])
    if (currentEvent) {
        const eventType = formatEventType(currentEvent.event_type)
        return (
            <Dialog open={openModal} onOpenChange={setOpenModal}>
                <DialogContent className="sm:max-w-xl p-12">
                    <DialogHeader>
                        <div className="flex gap-x-4">
                            <DialogTitle className="">{currentEvent.name}</DialogTitle>
                            <Badge className={`${eventType == 'activity'? 'bg-activity' : (eventType === 'workshop'? 
                            'bg-workshop' : 'bg-techtalk')} text-white`} variant="outline">{eventType}</Badge>
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
                                    eventsDispatch({
                                        type: EventContextActionType.SET_CURRENT_EVENT,
                                        event: event
                                    })
                                }}>{event.name}</Button>
                            })}
                        </CollapsibleContent>
                    </Collapsible>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => {
                                toast({
                                    title: 'Event has been saved',
                                    description: `From ${formatTimeInterval(currentEvent.start_time, currentEvent?.end_time)}`,
                                    action: (
                                        <ToastAction altText="Goto schedule to undo">
                                            <Button onClick={() => {
                                                eventsDispatch({
                                                    type: EventContextActionType.DESELECT_EVENT_AS_INTERESTED,
                                                    event: currentEvent
                                                })
                                            }}>Undo</Button>
                                        </ToastAction>
                                    )
                                })
                                eventsDispatch({
                                    type: EventContextActionType.SELECT_EVENT_AS_INTERESTED,
                                    event: currentEvent
                                })
                            }}
                        >I'm Interested!</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        )
    }
    return <></>
}