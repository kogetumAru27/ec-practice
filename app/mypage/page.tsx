import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import OrderHistory from "@/components/orderhistory";
export default async function MypagePage(){
    const session = await auth();
    if(!session){
        redirect("/login")
    }
    const orders = await prisma.order.findMany({
        where:{userId:session.user.id},
        include:{
            orderItems:{
                include:{product:true}
            },
            address:true,
            payments:true
        },
        orderBy:{createdAt:"desc"}
    });
    return(
        <div className="max-w-2xl mx-auto px-6 py-10">
            <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">注文履歴</h1>
            <Link href="/mypage/profile" className="text-sm text-emerald-600 hover:underline">プロフィール</Link>
            </div>
        <OrderHistory orders={orders}/>
        </div>
    )
}