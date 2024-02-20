"use client"

import { TEvent } from "@/app/schema/types";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { formatTimeInterval, getDayOfWeek } from "@/lib/format";
import { Button } from "../ui/button";

export function Event({event} : {event: TEvent}) {
    return (
            <Card>
                <CardHeader>
                <CardTitle> {event.name} </CardTitle>
                <CardDescription>{formatTimeInterval(event.start_time, event.end_time)}</CardDescription>
                </CardHeader>
            </Card>
    )   
}