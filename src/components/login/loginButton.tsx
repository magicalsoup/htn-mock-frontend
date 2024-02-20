"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function LoginButton() {
    return (
        <Button asChild className="w-full py-6 text-lg font-bold">
            <Link href="/home">Log in</Link>
        </Button>
    )
}