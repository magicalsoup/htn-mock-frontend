import { LoginButton } from "@/components/login/loginButton"
import { LoginInput } from "@/components/login/loginInput"
export default function Login() {
    return (
        <main className="bg-slate-800 h-screen w-screen">
            <div className="flex flex-col justify-center items-center py-32 px-32">
                <div className="flex flex-col w-[480px] gap-y-14"> {/*login box*/}
                    <div className="flex flex-col gap-y-4">
                        <h1 className="text-white font-bold text-4xl">
                            Log into your account
                        </h1>
                        <p className="text-slate-200">Procrasination is no more! It's time to hack! Take home the W!</p>
                    </div>
                    <div className="flex flex-col gap-y-4">
                        <LoginInput label="Email Address" placeholder="you@email.com"/>
                        <LoginInput label="Password" placeholder="*******"/>
                    </div>
                    <LoginButton/>
                </div>
            </div>
        </main>
    )
}