"use client"
import { TEvent } from "@/app/schema/types"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

export function Modal ({event, children} : {event: TEvent, children: any}) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{event.name}</DialogTitle>
                    <DialogDescription>
                        {event.description}
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
} 