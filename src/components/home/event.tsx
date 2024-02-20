"use client"

import { TEvent } from "@/app/schema/types";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { formatEventType, formatTimeInterval } from "@/lib/format";
import { Badge } from "../ui/badge";

export function Event({event} : {event: TEvent}) {
    const eventType = formatEventType(event.event_type)
    return (
            <Card>
                <CardHeader>
                    <div className="flex gap-x-4">
                        <CardTitle> {event.name}</CardTitle>
                        <Badge className={`${eventType == 'activity'? 'bg-activity' : (eventType === 'workshop'? 
                            'bg-workshop' : 'bg-techtalk')} text-white`} variant="outline">{eventType}</Badge>
                    </div>
                    <CardDescription>{formatTimeInterval(event.start_time, event.end_time)}</CardDescription>
                </CardHeader>
            </Card>
    )   
}