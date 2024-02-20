"use client"

import { TEvent } from "@/app/schema/types";
import { getDayOfWeek } from "@/lib/format";
import { Event } from "@/components/home/event"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
import { useEffect, useState } from "react";

export function EventsList({day, events} : {day: string; events:TEvent []}) {
    const [currentEvent, setCurrentEvent] = useState<TEvent | null>(null)
    const [openModal, setOpenModal] = useState(false)

    useEffect(() => {
        setCurrentEvent(events[0])
    }, [events])

    return (
        <div className="flex flex-col gap-y-4">
            {events && events.map((event, id) => {
                if (getDayOfWeek(event.start_time) === day) {
                    return <div key={id} onClick={() => {
                            setOpenModal(true)
                            setCurrentEvent(event)
                        }}>
                        <Event  event={event}/>
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
                </DialogContent>
            </Dialog>}
        </div>
    )
}