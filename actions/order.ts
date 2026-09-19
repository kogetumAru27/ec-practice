"use server"
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { checkoutSchema } from "@/lib/validation";
import { createorderItems } from "@/lib/ordertest";
export default async function createOrder(formData:FormData){
    const session = await auth();
    if(!session){
        redirect("/login")
    }
    const raw = {
        postalCode:formData.get("postalCode"),
        prefecture:formData.get("prefecture"),
        city:formData.get("city"),
        line1:formData.get("line1"),
        line2:formData.get("line2"),
        paymentMethod:formData.get("paymentMethod")
    }
    const parsed = checkoutSchema.safeParse(raw);
    if(!parsed.success){
        return {success:false,error:parsed.error.issues[0].message}
    }
    const cart = await prisma.cart.findUnique({
        where:{userId:session.user.id},
        include:{cartItems:{include:{product:true}}}
    });
    if(!cart || cart.cartItems.length === 0){
        return {success:false,error:"カートに商品がありません"}
    }
    const total = cart.cartItems.reduce(
        (sum,item) => sum + item.product.price * item.quantity,
        0
    );
    try{
        const address = await prisma.address.create({
            data:{
                userId:session.user.id,
                postalCode:parsed.data.postalCode,
                prefecture:parsed.data.prefecture,
                city:parsed.data.city,
                line1:parsed.data.line1,
                line2:parsed.data.line2
            }
        });
        // Orderを作成
        const order = await prisma.order.create({
            data:{
                userId:session.user.id,
                addressId:address.id,
                totalprice:total
            }
        }) 
        //カートアイテムを元にorderアイテムを作成
       const OrderItem = createorderItems({cartItems:cart.cartItems,orderId:order.id})
       await prisma.orderItem.createMany({
        data:OrderItem
       })
        //支払い方法を作成
        await prisma.payment.create({
            data:{
                orderId:order.id,
                amount:total,
                method:parsed.data.paymentMethod
            }
        });
        //カートをからにする
        await prisma.cartItem.deleteMany({
            where:{cartId:cart.id}
        })

    }catch(error){
        return {success:false,error:"注文の処理に失敗しました"}
    }
    redirect("/order/complete");
}