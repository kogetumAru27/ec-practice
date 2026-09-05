import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProductForm from "@/components/CreateProd";
export default async function  EditProductPage({params}:{params:{id:string}}){
    const categories = await prisma.category.findMany();
    const {id} = await params
    const product = await prisma.product.findUnique({
        where:{id}
    });
    if(!product){
        notFound()
    }
    return(
        <div>
            <ProductForm categories={categories} initialData={product ?? undefined}/>
        </div>
    )
}