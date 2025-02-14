"use client"
import { ReloadIcon } from "@radix-ui/react-icons"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import useSession from "@/session/use-session"
import { User } from "@/session/lib"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { DEMO_USERNAME, DEMO_PASSWORD } from "@/lib/constants"
import { Label } from "@/components/ui/label"
import { Header } from "@/components/login/Header"


const formSchema = z.object({
    username: z.string().min(1, {
      message: "Username must be at least 1 character.",
    }),
    password: z.string()
  })

export default function Login() {

    const { login } = useSession()
    const [isLoggingIn, toggleIsLoggingIn] = useState(false);
    const [showLoginError, toggleShowLoginError] = useState(false)

    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: "",
          password: "",
        },
    })
     
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const username = values.username;
        const password = values.password;

        const user: User = {
            username: username,
            password: password
        }

        toggleIsLoggingIn(true)
        const response = await login(user)

        if (!response.isLoggedIn) {
            toggleIsLoggingIn(false)
            toggleShowLoginError(true)
        } else {
            router.push("/");
        }
    }

    // use middleware instead
    // useEffect(() => {
    //     if (!isLoading && session.isLoggedIn) {
    //         router.replace("/")
    //     }
    // }, [session, isLoading, router])

    return (
        <main className="bg-slate-800 h-screen w-screen">
            <Header/>
            <div className="flex flex-col justify-center items-center py-24 px-32">
                <div className="flex flex-col w-[480px] gap-y-14"> 
                    <div className="flex flex-col gap-y-4">
                        <h1 className="text-white font-bold text-4xl">
                            Log into your account
                        </h1>
                        <p className="text-slate-200">Procrasinate no more! It&#39;s time to hack! Take home the W!</p>
                    </div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} method="POST" className="space-y-8">
                            <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-slate-400">Username</FormLabel>
                                    <FormControl onChange={() => toggleShowLoginError(false)}>
                                        <Input placeholder="username" {...field}/>
                                    </FormControl>
                                    <FormControl></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}/>
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-slate-400">Password</FormLabel>
                                        <FormControl onChange={() => toggleShowLoginError(false)}>
                                            <Input type="password" placeholder="******" {...field}/>
                                        </FormControl>
                                        <FormControl></FormControl>
                                        <FormMessage />
                                    </FormItem>
                            )}/>
                            <div className="flex flex-col gap-y-2">
                                {showLoginError && <Label className="text-destructive">Incorrect username or password</Label>}
                                {!isLoggingIn && <Button type="submit" className="bg-gradient-to-r from-cyan-500 to-amber-300 hover:from-cyan-600 hover:to-amber-400 w-full py-6 text-lg font-bold">Log in</Button>}
                                {isLoggingIn && <Button className="bg-gradient-to-r from-cyan-500 to-amber-300 w-full py-6 text-lg font-bold"disabled>
                                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                        Logging you in
                                    </Button>}
                            </div>
                            <div className="text-white flex flex-col">
                                <span>DEMO Username is {DEMO_USERNAME}</span>
                                <span>DEMO Password is {DEMO_PASSWORD}</span>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </main>
    )
}