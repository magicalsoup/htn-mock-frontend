import HTN_LOGO from "@/static/htn-icon.jpg"
import { Label } from "@/components/ui/label"
import Image from "next/image"
export function Header() {
    return (
        <div className="flex items-center gap-x-8 px-16 py-8">
            <Image className="rounded-full" width={50} height={50} src={HTN_LOGO} alt="failed"/>
            <Label className="text-xl font-bold text-white">Hack the South</Label>
        </div>
    )
}