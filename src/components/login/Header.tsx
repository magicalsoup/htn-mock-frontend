import HTN_LOGO from "@/static/htn-icon.jpg"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { useRouter } from "next/navigation"
export function Header() {
    const router = useRouter();
    return (
        <div className="flex items-center gap-x-4 md:gap-x-8 px-8 lg:px-16 py-8">
            <Image className="cursor-pointer rounded-full" width={50} height={50} src={HTN_LOGO} alt="failed" onClick={() => router.push("/")}/>
            <Label className="cursor-pointer text-md md:text-xl font-bold text-white" onClick={() => router.push("/")}>Hack the East</Label>
        </div>
    )
}