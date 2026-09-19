"use server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { OrderStatus } from "@/app/generated/prisma/client";
import { PayStatus } from "@/app/generated/prisma/client";

export default async function updateOrderStatus(orderId:string,newOrderstats:OrderStatus){
    const session = await auth();
    if(!session || session.user.type !== "ADMIN"){
        return {success:false,error:"権限がありません"}
    }
    try{
        await prisma.order.update({
            where:{id:orderId},
            data:{status:newOrderstats}
        });
       return {success:true}
        
    }catch(error){
        return {success:false,error:"配送の更新に失敗しました"}
    }
} 
export async function updatePaymentStatus(paymentId:string,newPaymentStats:PayStatus){
    const session = await auth();
    if(!session || session.user.type !== "ADMIN"){
        return {success:false,error:"権限がありません"}
    }
    try{
        await prisma.payment.update({
            where:{id:paymentId},
            data:{status:newPaymentStats}
        });
        return {success:true}

    }catch{
        return {success:false,error:"支払い方法の変更に失敗しました"}
    }
}