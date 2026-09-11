import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import NewPass from "@/components/newpassForm";
export default async function ChangePasswordPage(){
    const session = await auth();
    if(!session){
        redirect("/login")
    }
    return(
        <div className="max-w-md mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">パスワードの変更</h1>
        <NewPass />
    </div>
    )
}