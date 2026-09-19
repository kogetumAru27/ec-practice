"use client"
import { useActionState,useEffect } from "react";
import { PasswordInput } from "@/components/passwordInput";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { loginAction ,githubAction, googleAction} from "@/actions/login";
import { useRouter } from "next/navigation";
export default function Login(){
    const [state,formaction] = useActionState(
        async(_prevState:{success?:boolean,error?:string}|null,formData:FormData) => {
           return await loginAction(formData)
        },null
    )
    const router = useRouter();
    useEffect(() => {
        if(state?.success){
            router.push("/")
        }
    },[state,router])
    return(
<div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-8">ログイン</h1>

        <form action={formaction} className="flex flex-col gap-4">
            <input 
                type="email" 
                placeholder="メールアドレス" 
                name="email"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
            <PasswordInput name="password" label="ログインパスワード"/>

            {state?.error && <p className="text-red-500 text-sm">{state.error}</p>}
            {state?.success && <p className="text-green-600 text-sm">ログイン成功</p>}

            <button 
                type="submit" 
                className="w-full py-2.5 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition"
            >
                Sign in
            </button>
        </form>

        <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-sm text-gray-400">or</span>
            <div className="flex-1 h-px bg-gray-200" />
        </div>

        <div className="flex flex-col gap-3">
            <form action={googleAction}>
                <button 
                    type="submit" 
                    className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2.5 hover:bg-gray-50 transition"
                >
                    <FcGoogle size={20}/>
                    <span className="text-sm font-medium text-gray-700">Googleでログイン</span>
                </button>
            </form>
            <form action={githubAction}>
                <button 
                    type="submit" 
                    className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2.5 hover:bg-gray-50 transition"
                >
                    <FaGithub size={20}/>
                    <span className="text-sm font-medium text-gray-700">Githubでログイン</span>
                </button>
            </form>
        </div>
    </div>
</div>
    )
}