"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import useSession from "@/session/use-session"
import { User } from "@/session/lib"
import { redirect } from "next/dist/server/api-utils"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const formSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    password: z.string()
  })

export default function Login() {

    const { session, login, isLoading } = useSession()
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: "",
          password: "",
        },
    })

     
    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        const username = values.username;
        const password = values.password;

        const user: User = {
            username: username,
            password: password
        }

        login(user)
    }

    useEffect(() => {
        if (!isLoading && session.isLoggedIn) {
            router.replace("/")
        }
    }, [session, isLoading])

    return (
        <div className="bg-slate-800 h-screen w-screen">
            <div className="flex flex-col justify-center items-center py-32 px-32">
                <div className="flex flex-col w-[480px] gap-y-14"> {/*login box*/}
                    <div className="flex flex-col gap-y-4">
                        <h1 className="text-white font-bold text-4xl">
                            Log into your account
                        </h1>
                        <p className="text-slate-200">Procrasination is no more! It's time to hack! Take home the W!</p>
                    </div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} method="POST" className="space-y-8">
                            <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-slate-400">Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="username" {...field} />
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
                                        <FormControl>
                                            <Input placeholder="password" {...field} />
                                        </FormControl>
                                        <FormControl></FormControl>
                                        <FormMessage />
                                    </FormItem>
                            )}/>
                            <Button type="submit" className="w-full py-6 text-lg font-bold">Log in</Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    )
}