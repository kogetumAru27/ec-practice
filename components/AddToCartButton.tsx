"use client";
import { useRouter } from "next/navigation";
import addCart from "@/actions/cart";
type Props = {
    productId:string
}
export default function AddcartButton({productId}:Props){
    const router = useRouter();
    return(
        <div>
        <form action={async () => {
            await addCart(productId);
            router.refresh();
        }}>
            <button type="submit" className="w-full py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition">
                カートに入れる
            </button>
        </form>
        </div>
    )
}