import { Prisma } from "@/app/generated/prisma/client";
import { Package } from "lucide-react";
import UpdateOrderStatus from "./updateOrderStatus";
import UpdatePaymentStatus from "./updatePaymentStatus";
type OrderWithDetails = Prisma.OrderGetPayload<{
    include:{
        orderItems:{include:{product:true}};
        user:true;
        payments:true
    }
}>
type Props = {
    orders:OrderWithDetails[]
}
export default function AdminOrders({orders}:Props){
    if(orders.length === 0){
        return (
            <div className="text-center py-16">
                <Package className="mx-auto text-gray-300" size={48} />
                <p className="mt-4 text-gray-500">まだ、注文履歴がありません</p>
            </div>
        );
    }
    return(
        <div>
            {orders.map(order => (
                <div key={order.id} className="border border-gray-200 rounded-xl p-4 mb-4">
                    <div className="flex justify-between items-start mb-3 pb-3 border-b border-gray-100">
                        <div>
                            <p className="text-sm font-medium text-gray-900">{order.user.name}</p>
                            <p className="text-xs text-gray-500">{order.user.email}</p>
                            <p className="text-xs text-gray-500 mt-1">
                                注文日:{order.createdAt.toLocaleDateString("ja-JP")}
                            </p>
                        </div>
                        <p className="text-sm font-semibold text-emerald-700 ">{order.totalprice.toLocaleString()}円</p>
                    </div>
                    <div className="flex flex-col gap-1 mb-3">
                        {order.orderItems.map((item) => (
                         <p key={item.id} className="text-sm text-gray-600">
                            {item.product.name} × {item.quantity}
                        </p>
                    ))}
                    </div>
                  <UpdateOrderStatus orderId={order.id} currentStatus={order.status}/>
                 {order.payments && (
                    <UpdatePaymentStatus paymentId={order.payments.id} currentPayment={order.payments.status}/>
                 )}
                </div>
            ))}
        </div>
    )
}