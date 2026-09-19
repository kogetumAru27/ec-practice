import Image from "next/image";
import { prisma } from "@/lib/prisma";
import  Link  from "next/link";
import AddcartButton from "@/components/AddToCartButton";
export default async function Home({ searchParams }: { searchParams: Promise<{ q?: string,category?:string }> }) {
    const { q,category } = await searchParams;//q?はあってもなくてもどちらでも良い
    const categories = await prisma.category.findMany()
    const products = await prisma.product.findMany({
        where:  {
            ...(q?{name:{contains:q}}:{}),
            ...(category?{categoryId:category}:{})
        },
        include: { category: true }
    });
    
    return (
        <div className="max-w-6xl mx-auto px-6 py-10">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">商品一覧</h1>
            
            <form action="/" method="GET" className="mb-8">
                <input 
                    type="text" 
                    name="q" 
                    defaultValue={q}
                    placeholder="商品を検索"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
            </form>
            <div className="flex gap-2 mb-8">
              <Link href="/" className={`px-4 py-2 rounded-full text-sm font-medium ${
                        !category ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}>すべて</Link>
                      {categories.map((c) => (
                  <Link 
                        key={c.id}
                        href={`/?category=${c.id}`}
                        className={`px-4 py-2 rounded-full text-sm font-medium ${
                            category === c.id ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                    >
                        {c.name}
                    </Link>
                ))}
            </div>
            {products.length === 0 ? (
                <p className="text-gray-500">「{q}」に、一致する、商品が、見つかりませんでした</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((p) => (
                        <div 
                            key={p.id} 
                            className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
                            <Link href={`/products/${p.id}`}>
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
                                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                    {p.category.name}
                                </span>
                                <h3 className="mt-2 font-medium text-gray-900 truncate">{p.name}</h3>
                                <p className="mt-1 text-emerald-700 font-semibold">{p.price.toLocaleString()}円</p>
                            </div>
                            </Link>
                            <AddcartButton productId={p.id}/>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}