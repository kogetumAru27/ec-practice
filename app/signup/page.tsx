"use client";
import { useActionState } from "react";
import { signupAction } from "@/actions/signupAction";
import { PasswordInput } from "@/components/passwordInput";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function SignUp(){
    const [state,formaction] = useActionState(//自動でformを更新してくれる。_使っていない引数
        async(_prevState:{success?:boolean;error?:string;} | null ,formData:FormData) => {
            return await signupAction(formData);
        },null//初期値
    );
    const router = useRouter();
    useEffect(() => {
        if(state?.success){
            router.push("/mypage")
        }
    },[state,router])
    return(
        <div className="max-w-md mx-auto mt-12 p-6">
            <h1 className="text-2xl font-bold mb-8 text-center">新規登録</h1>
            <form action={formaction} className="flex flex-col gap-4">
            <input type="text" name="name" placeholder="ユーザー名" className="w-full border rounded px-4 py-3 text-base" />
            <input type="email" name="email" placeholder="メールアドレス" className="w-full border rounded px-4 py-3 text-base" />
            <PasswordInput name="password" label="パスワード"/>
            <PasswordInput name="confirmpassword" label="確認用パスワード"/>
            {state?.error && <p className="text-red-500 text-sm">{state.error}</p>}
            {state?.success &&<p className="text-green-600 text-sm">登録が完了しました</p> }
            <button type="submit" className="w-full py-3 bg-green-600 text-white rounded font-semibold text-base">登録</button>
            </form>
        </div>
    )
}