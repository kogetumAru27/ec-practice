"use client";
import { updateQuanitity,removeFromCart } from "@/actions/cart";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
type Props = {
    id:string,
    quanitity:number//現在の数量
}
export default function QuanitityControl({id,quanitity}:Props){
    const router = useRouter();
    const handlechange = async(newQuantity:number)/*これから変更したい数量(未来の数)これにより増減ができるようになる本来は+-で処理を書かないといけない*/  => {
        await updateQuanitity(id,newQuantity)
        router.refresh()
    }
    const handleremove = async() => {
        if(!confirm("このカートからこの商品を削除しますか？"))return;
        await removeFromCart(id)
        router.refresh();
    }
    return(
        <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
            <button onClick={() => handlechange(quanitity - 1)} className="w-7 h-7 border-gray-300 rounded-full text-gray-600 hover:bg-gray-50">-</button>
            <span className="text-sm font-medium w-4 text-center">{quanitity}</span>
            <button onClick={() => handlechange(quanitity + 1)} className="w-7 h-7 border-gray-300 rounded-full text-gray-600 hover:bg-gray-50">+</button>
        </div>
        <button onClick={handleremove} className="text-gray-400 hover:text-red-500 transition">
            <Trash2 size={18}/>
        </button>
        </div>
    )
}