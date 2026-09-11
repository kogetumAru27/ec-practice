import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { signOut } from "@/lib/auth";
export default async function Profile(){
    const session = await auth();
    if(!session){
        redirect("/login")
    }
    const user = await prisma.user.findUnique({
        where:{id:session.user.id}
    });
    if(!user){
        redirect("/login")
    }
    const accounts = await prisma.account.findMany({
        where:{userId:session.user.id}
    })
    if(!accounts){ 
        redirect("login")
    }
    return(
        <div className="max-w-md mx-auto px-6 py-10">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">プロフィール</h1>
            <p>名前:{user.name}</p>
            <p>メールアドレス:{user.email}</p>
            <form action={async() =>{
                "use server"
                await signOut({ redirectTo: "/" });
            }}>  
            <button type="submit" className="mt-6 w-full py-2.5 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition">ログアウト</button>
            </form>
            <div className="mt-6">
                <h2 className="text-sm font-medium text-gray-700 mb-2">連携しているログイン方法</h2>
                <div className="flex flex-col gap-1">
                   {accounts.map(account => (
                    <p key={account.id} className="text-sm text-gray-600">
                        {account.provider === "google" && "Google"}
                        {account.provider === "github" && "GitHub"}
                    </p>
                   ))}
                    {user.password && ( <p className="text-sm text-gray-600">メールアドレスとパスワード</p> )}
                </div>
            </div>
            {user.password && (<Link href="/mypage/profile/password" className="mt-4 inline-block text-sm text-emerald-600 hover:underline">パスワードを変更する</Link>)}
        </div>
    )
}