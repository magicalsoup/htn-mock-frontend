import { ReloadIcon } from "@radix-ui/react-icons"
import { Label } from "@radix-ui/react-label"

export function Loading() {
    return (
        <main className="h-screen w-screen flex flex-col items-center justify-center bg-background">
            <div className="flex gap-x-4 items-center">
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                <Label>
                    Directing you to your schedule...
                </Label>
            </div>
        </main>
    )
}