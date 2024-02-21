import Image from "next/image"
import HTN_LOGO from "@/static/htn-icon.jpg"
import { Label } from "@/components/ui/label"
export function Header() {
    return (
        <div className="flex items-center gap-x-8 px-16 py-8">
            <Image width={50} height={50} src={HTN_LOGO} alt="failed"/>
            <Label className="text-xl font-bold">Hack the South</Label>
        </div>
    )
}