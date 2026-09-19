"use server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { productsSchema } from "@/lib/validation";
export  async function createProducts(formData:FormData){
    const session = await auth();
    if(!session || session?.user.type !== "ADMIN"){
        return { success: false, error: "権限がありません" }
    }
    const raw = {
        name:formData.get("name"),
        description:formData.get("description"),
        price:formData.get("price"),
        categoryId:formData.get("categoryId"),
        imageUrl:formData.get("imageUrl") || undefined
    }
    const parsed = productsSchema.safeParse(raw);
    if(!parsed.success) return {success:false,error:parsed.error.issues[0].message}
    try{
        await prisma.product.create({
            data:{
                name:parsed.data.name,
                description:parsed.data.description,
                price:parsed.data.price,
                categoryId:parsed.data.categoryId,
                imageUrl:parsed.data.imageUrl
            }
        })
        return {success:true}
    }catch(error){
        return {success:false,error:"商品の登録ができませんでした"}
    }
}
export async function updateProducts(id:string,formData:FormData){
    const session = await auth();
    if(session?.user.type !== "ADMIN"){
        return {success:false,error:"権限がありません"}
    }
    
    const raw = {
        id:formData.get("id"),
        name:formData.get("name"),
        description:formData.get("description"),
        price:formData.get("price"),
        categoryId:formData.get("categoryId"),
        imageUrl:formData.get("imageUrl") || undefined
    }
    const parsed = productsSchema.safeParse(raw);
    if(!parsed.success){
        return {success:false,error:parsed.error.issues[0].message}
    }
    try{
        await prisma.product.update({
            where:{id},
            data:{
                name:parsed.data.name,
                description:parsed.data.description,
                price:parsed.data.price,
                categoryId:parsed.data.categoryId,
                imageUrl:parsed.data.imageUrl
            }
        })
        return {success:true}
    }catch(error){
        return {success:false,error:"商品の更新ができませんでした" }
    }

}
export async function deleteProduct(id:string){
    const session = await auth();
    if(!session || session.user.type !== "ADMIN"){
        return {success:false,error:"権限がありません"}
    }
    try{
        await prisma.product.delete({
            where:{id}
        })
        return {success:true}
    }catch(error){
        return {success:false,error:"商品の削除に失敗しました"}
    }
}