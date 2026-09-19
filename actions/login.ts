"use server";
import { signIn } from "@/lib/auth";
import { loginSchema } from "@/lib/validation";
import { AuthError } from "next-auth";
export async function loginAction(formData:FormData){
    const raw = {
        email: formData.get("email"),
        password: formData.get("password"),
    }; 
    const parsed = loginSchema.safeParse(raw);
    if(!parsed.success)return {success:false,error:parsed.error.issues[0].message}
    try {
        await signIn("credentials", {
            email: parsed.data.email,
            password: parsed.data.password,
            redirect:false
        });
        return { success: true };
    } catch (error) {
        if (error instanceof AuthError) {
            // これは「Auth.jsが投げた、認証関連のエラー」だと確認できたこれでなくても問題なく動く
            return { success: false, error: "メールアドレスまたはパスワードが間違っています" };
        }
        throw error;//想定外のエラー
    }
    }
export async function googleAction(){
    console.log("googleActionが呼ばれました");
    await signIn("google",{redirectTo:"/"})
}
export async function githubAction(){
    await signIn("github",{redirectTo:"/"})
}