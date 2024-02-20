"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label";

export function LoginInput({label, placeholder} : {
    label: string;
    placeholder: string;
}) {
    return (
        <div className="flex flex-col gap-y-2">
            <Label className="text-slate-400"> {label} </Label>
            <Input type="email" placeholder={placeholder}/>
        </div>
    )
} 