"use client";
import { useRouter } from "next/navigation";
import updateOrderStatus from "@/actions/updateorder";
import { OrderStatus } from "@/app/generated/prisma/client";
type Props = {
    orderId:string,
   currentStatus:OrderStatus 
}
export default function UpdateOrderStatus({orderId,currentStatus}:Props){
    const router = useRouter();
    const handlechangeOrderstatus = async(newstatus:OrderStatus) => {
        await updateOrderStatus(orderId,newstatus);
        router.refresh();
    }
    return(
        <select 
            defaultValue={currentStatus}
            onChange={(e) => handlechangeOrderstatus(e.target.value as OrderStatus)}
            className="text-sm border border-gray-300 rounded-lg px-2 py-1"
        >
            <option value="PROCESSING">処理中</option>
            <option value="SHIPPED">発送済み</option>
            <option value="DELIVERED">配達完了</option>
            <option value="CANCELED">キャンセル</option>
        </select>
    )
}