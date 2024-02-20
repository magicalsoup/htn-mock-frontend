"use client"

import { TEvent } from "@/app/schema/types";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { formatTimeInterval, getDayOfWeek } from "@/lib/format";

export function EventsList({day, events} : {day: string; events:TEvent []}) {
    return (
        <div>
            {events && events.map((event) => {
                if (getDayOfWeek(event.start_time) === day) {
                    return (
                        <Card>
                            <CardHeader>
                            <CardTitle> {event.name} </CardTitle>
                            <CardDescription>{formatTimeInterval(event.start_time, event.end_time)}</CardDescription>
                            </CardHeader>
                        </Card>
                    )
                }
            })}
        </div>
    )
}