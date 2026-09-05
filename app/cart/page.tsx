import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Image from "next/image";
import QuanitityControl from "@/components/updateButton";
export default async function CartPage(){
    const session = await auth();
    if(!session){
        redirect("/login")
    }
    const Items = await prisma.cart.findUnique({
        where:{userId:session.user.id},
        include:{
            cartItems:{
                include:{
                    product:true
                }
            }
        }
    })
    const total = Items?.cartItems.reduce((sum,item) => sum + item.product.price * item.quantity,0) ?? 0;
    return(
        <div className="max-w-2xl mx-auto px-6 py-10">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">カート</h1>
            {!Items || Items.cartItems.length === 0?(
                <p className="text-gray-500">カートは空です</p>
            ):(
                <div className="flex flex-col gap-4">
                    {Items.cartItems.map(item => (
                        <div key={item.id} className="flex items-center gap-4 bg-white border border-gray-200 rounded-xl p-4">
                        <div className="relative w-16 h-16 shrink-0">
                            <Image
                            src={item.product.imageUrl || "/no-image.png"}
                            alt={item.product.name}
                            fill
                            sizes="64px"
                            className="object-cover rounded-lg"
                            />
                            </div>
                        <div className="flex-1">
                            <h3 className="font-medium text-gray-900">{item.product.name}</h3>
                            <p className="text-sm text-gray-500">{item.product.price.toLocaleString()}円×{item.quantity}</p>
                            <QuanitityControl id={item.id} quanitity={item.quantity}/>
                        </div>
                        </div>
                    ))}
                        {Items && Items.cartItems.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-gray-200 flex justify-between items-center">
                    <span className="text-white text-lg font-bold">合計</span>
                    <span className="text-lg font-bold text-emerald-700">{total.toLocaleString()}円</span>
                    </div>
                    )}
                </div>
            )}
        </div>
    )
}