"use server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function addCart(productId: string) {
    const session = await auth();
    if (!session) {
        redirect("/login");
    }
    const userId = session.user.id;
    
    let cart = await prisma.cart.findUnique({   // ← let に変更
        where: { userId }
    });
    
    if (!cart) {
        cart = await prisma.cart.create({   // ← ここで、cartに、新しく作られた結果を、代入する
            data: { userId }
        });
    }
    
    // ここに来た時点で、cartは、必ず存在する(null出はない)ので、if判定は、不要になる
    const existingItem = await prisma.cartItem.findFirst({
        where: { productId: productId, cartId: cart.id }
    });
    
    if (existingItem) {
        await prisma.cartItem.update({
            where: { id: existingItem.id },
            data: { quantity: existingItem.quantity + 1 }
        });
    } else {
        await prisma.cartItem.create({
            data: {
                cartId: cart.id,
                productId: productId,
                quantity: 1
            }
        });
    }
    
    return { success: true };
}
export async function removeFromCart(cartItemId:string){//一発削除個数増減なしでゴミ箱アイコンをタッチすると
    const session = await auth();
    if(!session){
        redirect("/login")
    }
    try{
        await prisma.cartItem.delete({
            where:{id:cartItemId}
        })
        return{success:true} 
    }catch(error){
        return {success:false,error:"カートからの削除に失敗しました"}
    }
}
export async function updateQuanitity(cartItemId:string,newQuanitity:number){//これで商品を増減する
    const session = await auth();
    if(!session){
        redirect("/login")
    }
    if(newQuanitity <= 0){
        await prisma.cartItem.delete({
            where:{id:cartItemId}
        })
        return {success:true}
    }
    try{
        await prisma.cartItem.update({
            where:{id:cartItemId},
            data:{quantity:newQuanitity}
        })
        return {success:true}
    }catch(error){
        return { success: false, error: "数量の変更に失敗しました" };
    }
}