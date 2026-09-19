import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import addCart from "@/actions/cart";
import AddcartButton from "@/components/AddToCartButton";
import { redirect } from "next/navigation";
export default async function ProductDetailPage({params}:{params:Promise<{id:string}>}){
    const {id} = await params;
    const product = await prisma.product.findUnique({
        where:{id},
        include:{category:true}
    });
    if(!product){
        notFound();
    }
    return(
        <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="relative aspect-square bg-gray-50 rounded-2xl overflow-hidden">
            <Image
                src={product.imageUrl || "/no-image.png"}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-cover"
            />
        </div>
        
        <div className="mt-6">
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                {product.category.name}
            </span>
            <h1 className="mt-2 text-2xl font-bold text-gray-900">{product.name}</h1>
            <p className="mt-2 text-xl text-emerald-700 font-semibold">
                {product.price.toLocaleString()}円
            </p>
            <p className="mt-4 text-gray-600">{product.description}</p>
            
            <div className="mt-8 flex flex-col gap-3">
            <AddcartButton productId={product.id}/>
            <form action={async() => {
                "use server"
                await addCart(id);
                redirect("/checkout")
            }}>
            <button type="submit" className="w-full py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition">今すぐ買う</button>
            </form>
            </div>
        </div>
    </div>
    )
}