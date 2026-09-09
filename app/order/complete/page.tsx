import Link from "next/link";
import { CheckCircle } from "lucide-react";
export default function OrderCompletePage(){
    return(
        <div className="max-w-md mx-auto px-6 py-20 text-center">
            <CheckCircle className="mx-auto text-emerald-600" size={64}/>
            <h1 className="mt-6 text-2xl font-bold text-white">ご注文ありがとうございました</h1>
            <p className="mt-2 text-white">ご注文、承りました。</p>
            <Link href="/" className="mt-8 inline-block px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition">
            ホームに戻る
            </Link>
        </div>
    )
}