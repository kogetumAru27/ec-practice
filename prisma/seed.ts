import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
const adapter = new PrismaPg({
    connectionString:process.env.DATABASE_URL!
})
const prisma = new PrismaClient({adapter});
async function main(){
 const categoryNames = ["アパレル","日用品","服","本","食器"];
 for(const name of categoryNames){
    await prisma.category.upsert({
        where:{name},
        update:{},
        create:{name}
    })
 }
 const hashpass = await bcrypt.hash("password12345",10)
 await prisma.user.upsert({
    where:{email:"test@example.com"},
    update:{},
    create:{
        email:"test@example.com",
        password:hashpass,
        type:"USER",
        name:"テストユーザー"
    }
 });
 await prisma.user.upsert({
    where:{email:"admin@example.com"},
    update:{},
    create:{
        email:"admin@example.com",
        password:hashpass,
        type:"ADMIN",
        name:"テスト管理者"
    }
 })
    console.log("seed登録できました!")
}
main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async() => {
        await prisma.$disconnect()
    })