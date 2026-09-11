"use client";
import { PasswordInput } from "./passwordInput";
import { useActionState,useEffect } from "react";
import { useRouter } from "next/navigation";
import changePassword from "@/actions/changePass";
export default function NewPass(){
    const [state,formState] = useActionState(
        async(_prevstate:{success?:boolean,error?:string} | null,formData:FormData) => {
            return await changePassword(formData)
        },null
    );
    const router = useRouter();
    useEffect(() => {
        if(state?.success){
            router.push("/mypage/profile")
        }
    },[state,router]);
    return(
        <form action={formState}>
            <PasswordInput name="currentPassword" label="現在のパスワード"/>
            <PasswordInput name="newPassword" label="新しいパスワード"/>
            <PasswordInput name="confirmNewPassword" label="確認用パスワード"/>
            {state?.error && <p>{state.error}</p>}
            <button type="submit">変更する</button>
        </form>
    )
}