"use client"

import { TEvent } from "@/schema/types";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatEventType, formatTimeInterval } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

export function Event({event} : {event: TEvent}) {
    const eventType = formatEventType(event.event_type)
    return (
            <Card className="cursor-pointer hover:shadow-lg">
                <CardHeader>
                    <div className="flex gap-x-4">
                        <CardTitle> {event.name}</CardTitle>
                        <Badge className={`${eventType == 'activity'? 'bg-activity border-activity' : 
                                (eventType === 'workshop'? 'border-workshop bg-workshop' : 'border-techtalk bg-techtalk')} text-white`} 
                                variant="outline">
                            {eventType}
                        </Badge>
                    </div>
                    <CardDescription>
                        <div className="flex gap-x-2">
                                {event.speakers.length > 0 && <>
                                    <span>
                                        speakers: {event.speakers.map((speaker, id) => <Label key={id}>{speaker.name}</Label>)}
                                    </span>
                                    <span className="text-gray-400">|</span>
                                </>}
                                <span>{formatTimeInterval(event.start_time, event.end_time)}</span>
                        </div>
                    </CardDescription>
                </CardHeader>
            </Card>
    )   
}