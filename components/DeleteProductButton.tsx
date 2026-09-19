"use client";
import { deleteProduct } from "@/actions/Products";
import { useRouter } from "next/navigation";
import { useState } from "react";
type ButtonProps = {
    id:string
}
export default function Deletebutton({id}:ButtonProps){
    const router = useRouter();
    const [isdelete,setIsDelete] = useState(false);
    const handledelete = async() => {
        if(!confirm("本当に削除しますか?")){
            return
        }
        setIsDelete(true);
        const result = await deleteProduct(id);
        if(result.success){
            router.refresh()
        }else{
            alert(result.error);
            setIsDelete(false)
        }
    }
    return(
        <div>
            <button onClick={handledelete} disabled={isdelete} className="flex-1 text-center text-sm border border-red-300 text-red-600 rounded-lg py-2 hover:bg-red-50 transition disabled:opacity-50">
            {isdelete ? "削除中..." : "削除"}
            </button>
        </div>
    )
}
