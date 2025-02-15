"use client"

import { TEvent } from "@/schema/types";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatEventType, formatTimeInterval } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { useWindowSize } from "@/lib/utils";
import { LARGE_SCREEN_PX_SIZE } from "@/lib/constants";

export function Event({event} : {event: TEvent}) {
    const eventType = formatEventType(event.event_type)
    const { width } = useWindowSize();
    
    return (
            <Card className="cursor-pointer hover:shadow-lg">
                <CardHeader>
                    <div className="flex flex-col gap-x-2 gap-y-2">
                        <CardTitle className="text-sm md:text-md lg:text-lg xl:text-xl"> {event.name}</CardTitle>
                        <Badge className={`${eventType == 'Activity'? 'bg-activity border-activity' : 
                                (eventType === 'Workshop'? 'border-workshop bg-workshop' : 'border-techtalk bg-techtalk')} text-white text-[12px] md:text-xs font-light md:font-normal w-fit`} 
                                variant="outline">
                            {eventType}
                        </Badge>
                    </div>
                    <CardDescription>
                        <div className="flex flex-col gap-y-2 text-sm md:text-md">
                                {event.speakers.length > 0 && <>
                                    <span>
                                        Speakers: {event.speakers.map((speaker, id) => <Label key={id} className="text-sm md:text-md">{speaker.name}</Label>)}
                                    </span>
                                </>}
                                <span>{formatTimeInterval(event.start_time, event.end_time,  width >= LARGE_SCREEN_PX_SIZE)}</span>
                        </div>
                    </CardDescription>
                </CardHeader>
            </Card>
    )   
}