"use server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { changePasswordSchema } from "@/lib/validation";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
export default async function changePassword(formData:FormData){
    const session = await auth();
    if(!session){
        redirect("/login")
    }
    const raw = {
        currentPassword:formData.get("currentPassword"),
        newPassword:formData.get("newPassword"),
        confirmNewPassword:formData.get("confirmNewPassword")
    }
    const parsed = changePasswordSchema.safeParse(raw);
    if(!parsed.success){
        return {success:false,error:parsed.error.issues[0].message}
    }
    const user = await prisma.user.findUnique({
        where:{id:session.user.id}
    });
    if(!user || !user.password){
        return {success:false,error:"パスワードが一致しません"}
    }
    const isValid = await bcrypt.compare(parsed.data.currentPass,user.password);
    if(!isValid){
        return {success:false,error:"現在のパスワードが間違っています"}
    }
    const hashPass = await bcrypt.hash(parsed.data.newPass,10);
    await prisma.user.update({
        where:{id:session.user.id},
        data:{
            password:hashPass
        }
    });
    return {success:true}
}