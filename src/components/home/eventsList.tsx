"use client"

import { TEvent } from "@/schema/types";
import { getDayOfWeek } from "@/lib/format";
import { Event } from "@/components/home/Event"

import { useEffect, useState } from "react";
import { useEventsDispatch, useEventsState } from "../events-context/EventContext";
import useSession from "@/session/use-session";
import { getRelatedEvents } from "@/lib/event-data";
import { Modal } from "@/components/home/Modal";
import { EventContextActionType } from "@/schema/events-context-types";


export function EventsList({day} : {day: string;}) {

    const [openModal, setOpenModal] = useState(false)
    const eventsDispatch = useEventsDispatch()
    const eventsState = useEventsState()

    return (
        <div className="flex flex-col gap-y-4">
            { eventsState.filteredEvents &&  eventsState.filteredEvents.map((event, id) => {
                if (getDayOfWeek(event.start_time) === day) {
                    return <div key={id} onClick={() => {
                            setOpenModal(true)
                            eventsDispatch({
                                type: EventContextActionType.SET_CURRENT_EVENT,
                                event: event
                            })
                        }}>
                        <Event event={event}/>
                    </div>
                }
            })}
            {openModal && 
                <Modal openModal={openModal} setOpenModal={setOpenModal}/>}
        </div>
    )
}