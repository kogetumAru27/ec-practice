import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
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