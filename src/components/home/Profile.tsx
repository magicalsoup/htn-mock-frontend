import useSession from "@/session/use-session";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "../ui/label";
import {
    Collapsible,
    CollapsibleContent,
  } from "@/components/ui/collapsible"
import { useEventsState } from "../events-context/EventContext";
import { ChevronsUpDown } from "lucide-react";

export function Profile() {
    const { session, isLoading, logout } = useSession()
    const [loggingOut, toggleLoggingOut] = useState(false)
    const [openCollapsible, toggleOpenCollapsible] = useState(true)
    
    const router = useRouter()
    const eventsState = useEventsState()

    useEffect(() => {
        if (session.isLoggedIn) {
            toggleLoggingOut(false)
        }
    }, [session])
    useEffect(() => {
        if (loggingOut) {
            router.replace("/login")
        }
    }, [session, toggleLoggingOut])

    if (!session.isLoggedIn) {
        return (
            <div className="">
                 <span>
                    <Button variant="link" onClick={() => {
                        router.replace('/login')   
                    }}>
                        Click here to log in
                    </Button>
                </span>
            </div>
        )
    }

    return (
        <div className="flex flex-col w-96 gap-y-6">
            <div className="flex flex-col justify-center p-4 gap-y-4 h-36 outline outline-1 outline-border rounded-md">
                <div className="flex gap-x-4 items-center">
                    <Avatar>
                        <AvatarImage src="https://my.hackthenorth.com/static/media/logo.fdff3c11.svg"/>
                        <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <Label>{session.username}</Label>
                </div>
                <Button onClick={() => {
                    toggleLoggingOut(true)
                    logout()
                }}>Log out</Button>
            </div>
            <div className="flex flex-col">
                <div className="flex">
                <h1 className="text-xl font-bold">Your picks</h1>
                    <Button variant="ghost" size="sm" className="w-9 p-0" onClick={
                        () => toggleOpenCollapsible((old) => !old)
                    }>
                        <ChevronsUpDown className="h-4 w-4" />
                        <span className="sr-only">Toggle</span>
                    </Button>
                </div>
                <Collapsible open={openCollapsible} onOpenChange={toggleOpenCollapsible}>
                    <CollapsibleContent className="space-y-2">
                    {eventsState.interestedEvents.map((event, id:number) => {
                        return <div key={id} className="rounded-md border px-4 py-3 text-sm">
                            {event.name}
                        </div>
                    })}
                    </CollapsibleContent>
                </Collapsible>
            </div>
        </div>
    )
}