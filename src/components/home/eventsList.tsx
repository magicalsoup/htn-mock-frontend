"use client"

import { TEvent } from "@/app/schema/types";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { formatTimeInterval, getDayOfWeek } from "@/lib/format";
import { Modal } from "./modal";
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
        <div>
            {events && events.map((event, id) => {
                if (getDayOfWeek(event.start_time) === day) {
                    return <div onClick={() => {
                        setOpenModal(true)
                        setCurrentEvent(event)
                    }}>
                        <Event key={id} event={event}/>
                    </div>
                }
            })}
            {openModal && <Dialog open={openModal} onOpenChange={setOpenModal}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>{currentEvent?.name}</DialogTitle>
                        <DialogDescription>
                            {currentEvent?.description}
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>}
        </div>
    )
}