import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import AdminOrders from "@/components/AdminOrderList";
export default async function Changestats(){
    const session = await auth();
    if(!session || session.user.type !== "ADMIN"){
        redirect("/")
    }
    const orders = await prisma.order.findMany({
        include:{orderItems:{
            include:{product:true}
        },
        user:true,
        payments:true
    },
    orderBy:{createdAt:"desc"}
    });
    return(
        <div>
            <AdminOrders orders={orders}/>
        </div>
    )
}