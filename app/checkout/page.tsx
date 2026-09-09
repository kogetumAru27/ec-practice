import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import CheckoutForm from "@/components/CheckoutForm";
export default async function CheckoutPage(){
    const session = await auth();
    if(!session){
        redirect("/login")
    }
    const cart = await prisma.cart.findUnique({
        where:{userId:session.user.id},
        include:{
            cartItems:{
                include:{product:true}
            }

        }
    });
    if(!cart || cart.cartItems.length === 0){
        redirect("/cart")
    }
    const total = cart.cartItems.reduce(
        (sum,item) => sum + item.product.price * item.quantity,0
    );
    return(
        <div className="max-w-2xl mx-auto px-6 py-10">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">注文内容の確認</h1>
            <div className="flex flex-col gap-3 mb-6">
                {cart.cartItems.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                        <span>{item.product.name} × {item.quantity}</span>
                        <span>{(item.product.price * item.quantity).toLocaleString()}円</span>
                    </div>
                ))}
            </div>
            <div className="pt-4 border-t border-gray-200 flex justify-between font-bold mb-8">
                <span>合計</span>
                <span>{total.toLocaleString()}円</span>
            </div>
            <CheckoutForm/>
        </div>
    )
}