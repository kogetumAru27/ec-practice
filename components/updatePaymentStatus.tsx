"use client";
import { PayStatus } from "@/app/generated/prisma/client";
import { useRouter } from "next/navigation";
import { updatePaymentStatus } from "@/actions/updateorder";
type Props = {
    paymentId:string,
    currentPayment:PayStatus
}
export default function UpdatePaymentStatus({paymentId,currentPayment}:Props){
    const router = useRouter();
    const handlechange = async(newstatus:PayStatus) => {
        await updatePaymentStatus(paymentId,newstatus);
        router.refresh()
    }
    return(
        <select defaultValue={currentPayment} className="text-sm border border-gray-300 rounded-lg px-2 py-1" onChange={(e) => handlechange(e.target.value as PayStatus)}>
            <option value="PENDING">未払い</option>
            <option value="PAID">支払い済み</option>
            <option value="FAILED">決済失敗</option>
            <option value="REFUNDED">返金済み</option>
        </select>

    )
}