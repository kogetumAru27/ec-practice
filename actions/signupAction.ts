"use server";
import { prisma } from "@/lib/prisma";
import { sigInUpSchema } from "@/lib/validation";
import bcrypt from "bcryptjs";
import { signIn } from "@/lib/auth";
export async function signupAction(formData:FormData){
    const raw = {
        name:formData.get("name"),
        email:formData.get("email"),
        password:formData.get("password"),
        confirmpassword:formData.get("confirmpassword")
    }
    const parsed = sigInUpSchema.safeParse(raw);
    if(!parsed.success)return {success:false,error:parsed.error.issues[0].message}
    const {name,email,password} = parsed.data;
    const existingUser = await prisma.user.findUnique({where:{email}});
    if(existingUser) return{success:false,error:"このメールアドレスはすでに登録されています"};
    const hashedPassword = await bcrypt.hash(password,10);
    try{
        await prisma.user.create({
            data:{name,email,password:hashedPassword}
        });
        await signIn("credentials",{
            email,
            password,
            redirect:false
        })

        return {success:true}
    }catch{
        return {success:false,error:"新規登録できませんでした。"}
    }
}