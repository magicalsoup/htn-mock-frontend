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
import { TEvent } from "@/schema/types";
// import {
//     Collapsible,
//     CollapsibleContent,
//   } from "@/components/ui/collapsible"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button";
import { getRelatedEvents } from "@/lib/event-data";
import useSession from "@/session/use-session";
import { useEventsDispatch, useEventsState } from "../events-context/EventContext";
import { EventContextActionType } from "@/schema/events-context-types";
import { formatEventType, formatTimeInterval } from "@/lib/format";
import { ToastAction } from "@radix-ui/react-toast";
import { Label } from "../ui/label";

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
        
    }, [currentEvent, openModal, session.isLoggedIn])

    useEffect(() => {
        if (eventsState.currentEvent !== null) {
            setCurrentEvent(eventsState.currentEvent)
        }
    }, [eventsState.currentEvent])
    if (currentEvent) {
        const eventType = formatEventType(currentEvent.event_type)
        return (
            <Dialog open={openModal} onOpenChange={setOpenModal}>
                <DialogContent className="gap-y-10 sm:max-w-2xl pt-12 px-8">
                    <DialogHeader>
                        <div className="flex flex-col">
                            <div className="flex gap-x-4">
                                <DialogTitle className="">{currentEvent.name}</DialogTitle>
                                <Badge className={`${eventType == 'activity'? 'bg-activity bordeer-activity' : (eventType === 'workshop'? 
                                'border-workshop bg-workshop' : 'border-techtalk bg-techtalk')} text-white`} variant="outline">{eventType}</Badge>
                            </div>
                            <div className="flex gap-x-2">
                                {currentEvent.speakers.length > 0 && 
                                    <span>
                                        speakers: {currentEvent.speakers.map((speaker, id) => <Label key={id}>{speaker.name}</Label>)}
                                    </span>} 
                                    <span className="text-gray-400">|</span>
                                <span>{formatTimeInterval(currentEvent.start_time, currentEvent.end_time)}</span>
                            </div>
                        </div>
                    </DialogHeader>
                    <DialogDescription>
                        {currentEvent?.description}
                    </DialogDescription>
                    <div className="flex flex-col gap-y-1">
                        <h1 className="font-medium">You should also check out:</h1>
                        <div className="flex flex-col items-start gap-y-1">
                            {relatedEvents?.map((event, id: number) => {
                                return <Button variant="link" className="p-0.5 h-fit" key={id} onClick={() => {
                                    setOpenModal(true)
                                    eventsDispatch({
                                        type: EventContextActionType.SET_CURRENT_EVENT,
                                        event: event
                                    })  
                                }}>{event.name}</Button>
                            })}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="secondary" className="border border-border  hover:bg-slate-200" onClick={() => {
                            toast({
                                title: 'Event has been saved',
                                description: `From ${formatTimeInterval(currentEvent.start_time, currentEvent?.end_time)}`,
                                action: (
                                    <ToastAction type="button" className="bg-primary text-white font-bold rounded-md p-2" onClick={() => {
                                        eventsDispatch({
                                            type: EventContextActionType.DESELECT_EVENT_AS_INTERESTED,
                                            event: currentEvent
                                        })}} altText="Goto schedule to undo">
                                        Undo
                                    </ToastAction>
                                ),
                                duration: 1500
                            })
                            eventsDispatch({
                                type: EventContextActionType.SELECT_EVENT_AS_INTERESTED,
                                event: currentEvent
                            })
                        }}>I&#39;m Interested!</Button>
                        <Button onClick={()=> {
                            window.open(session.isLoggedIn? currentEvent.private_url : currentEvent.public_url, '_blank')
                        }}>
                            Link
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        )
    }
    return <></>
}