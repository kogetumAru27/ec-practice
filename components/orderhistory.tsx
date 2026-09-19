import { Prisma } from "@/app/generated/prisma/client";
import Image from "next/image";
import { Package } from "lucide-react";
type OrderWithDetails = Prisma.OrderGetPayload<{//includeがある場合これでtypeが取れる
    include:{
        orderItems:{include:{product:true}};
        payments:true
    }
}>;
type Props = {
    orders:OrderWithDetails[];
}
export default function OrderHistory({orders}:Props){
    if (orders.length === 0) {
        return (
            <div className="text-center py-16">
                <Package className="mx-auto text-gray-300" size={48} />
                <p className="mt-4 text-gray-500">まだ、注文履歴がありません</p>
            </div>
        );
    }
 return(
    <div className="flex flex-col gap-2">
        {orders.map(order => (
            <div key={order.id} className="border border-gray-200 rounded-xl p-4">
                <div className="flex justify-between items-centermb-3 pb-3 border-b border-gray-100">
                    <div>
                        <p className="text-xs text-gray-500">
                            注文日:{order.createdAt.toLocaleDateString("ja-Jp")}
                        </p>
                        <p className="text-sm font-medium text-gray-900">
                            合計:{order.totalprice.toLocaleString()}円
                        </p>
                        <p>
                           {order.payments && (
                            <p className="text-sm text-gray-500">
                                お支払い方法:{order.payments.method === "CASH" && "代金引換"}
                                {order.payments.method === "CREDIT_CARD" && "クレジットカード"}
                                {order.payments.method === "BANK_TRANSFER" && "銀行振込"}
                            </p>
                           )}
                        </p>
                    </div>
                    <div className="flex justify-between items-center mb-3 pb-3 borde-b border-gray-100">
                    <span className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                        {order.status === "PROCESSING" && "処理中"}
                        {order.status === "SHIPPED" && "発送済み"}
                        {order.status === "DELIVERED" && "配達完了"}
                        {order.status === "CANCELED" && "キャンセル"} 
                    </span>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    {order.orderItems.map(item => (
                        <div key={item.id} className="flex items-center gap-3">
                            <div className="relative w-12 h-12 shrink-0">
                            <Image src={item.product.imageUrl || "/no-image.png"} alt={item.product.name} fill sizes="48px" className="object-cover rounded-lg"/>
                            </div>
                            <div className="flex-1 text-sm">
                            <p className="text-gray-900">{item.product.name}</p>
                            <p className="text-gray-500">× {item.quantity}</p>
                            </div>
                        </div>
                        
                    ))}

                </div>
            </div>
        ))}

    </div>
 )
}
