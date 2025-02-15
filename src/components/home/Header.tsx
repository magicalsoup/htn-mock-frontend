"use client"

import Image from "next/image"
import HTN_LOGO from "@/static/htn-icon.jpg"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { useWindowSize } from "@/lib/utils"
import { LARGE_SCREEN_PX_SIZE, TABLET_WIDTH_PX_SIZE } from "@/lib/constants"
import useSession from "@/session/use-session"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdownmenu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "../ui/button"
export function Header() {
    const router = useRouter();
    const { width } = useWindowSize();
    const { session, logout } = useSession();

    if (width <= LARGE_SCREEN_PX_SIZE) { // mobile 
        return (
            <div className="flex justify-between items-center px-8 py-8">
                <div className="flex gap-x-4">
                    <Image className="cursor-pointer" width={25} height={25} src={HTN_LOGO} alt="failed" onClick={() => router.push("/")}/>
                    <Label className="cursor-pointer text-md md:text-xl font-bold" onClick={() => router.push("/")}>Hack the East</Label>
                </div>
                {session.isLoggedIn &&
                <DropdownMenu>
                    <DropdownMenuTrigger>   
                        <div className="flex space-x-4">
                            <Avatar>
                                <AvatarImage src={HTN_LOGO.src} className=""/>
                                <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>{session.username}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer" onClick={async () => {
                            await logout()
                            router.push("/login")}
                        }>Log Out</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>}
                {!session.isLoggedIn && <Button variant="link" onClick={() => router.replace('/login')}>
                        Log In
                </Button>}
            </div>
        )
    } else {
        return (
            <div className="flex items-center gap-x-8 px-16 py-8">
                <Image className="cursor-pointer" width={50} height={50} src={HTN_LOGO} alt="failed" onClick={() => router.push("/")}/>
                <Label className="cursor-pointer text-md md:text-xl font-bold" onClick={() => router.push("/")}>Hack the East</Label>
            </div>
        )
    }
}