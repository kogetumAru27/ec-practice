import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import Deletebutton from "@/components/DeleteProductButton";
export default async function AdminPage(){
    const session = await auth();
    if(!session ||session?.user.type !== "ADMIN"){
        redirect("/")
    }
    const products = await prisma.product.findMany({
        include:{category:true}
    })
    return(
        <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">管理画面</h1>
            <div className="flex gap-2 mt-4">
            <Link href="/admin/products/new" className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition cursor-pointer">+商品を追加</Link>
            <Link href="/admin/order" className="px-4 py-2  bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition cursor-pointer ">🔍注文一覧を見る</Link>
            </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(p => (
                <div key={p.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
                    <div className="relative aspect-square bg-gray-50">
                    <Image 
                        src={p.imageUrl || "/no-image.png"} 
                        alt={p.name} 
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover"
                    />
                    </div>
                    <div className="p-4">
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{p.category.name}</span>
                        <h3 className="mt-2 font-medium text-gray-900 truncate">{p.name}</h3>
                        <p className="mt-1 text-emerald-700 font-semibold">{p.price.toLocaleString()}円</p>
                        <Link href={`/admin/products/${p.id}/edit`} className="mt-3 block text-center text-sm border border-gray-300 rounded-lg py-2 hover:bg-gray-50 transition">編集する</Link>
                        <Deletebutton id={p.id}/>
                    </div>
                </div>
            ))}
        </div>
    </div>
    )
}