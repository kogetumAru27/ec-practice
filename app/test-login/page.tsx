import { signIn,signOut,auth } from "@/lib/auth";
export default async function Test(){
    const session = await auth()
    return(
        <div>
            {session ? (
                <>
               <p>ログイン中: {session.user?.email}</p>
               <form action={async() => {
                "use server";
                await signOut()
               }}>
                <button type="submit">ログアウト</button>
                </form> 
               </>
            ):(
                <form action={async() => {
                    "use server";
                    await signIn("google")
                }}>
                    <button type="submit">Googleでログイン</button>
                </form>
            )}
        </div>
    )
}