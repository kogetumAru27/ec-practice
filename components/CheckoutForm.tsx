"use client";
import createOrder from "@/actions/order";
import { useActionState,useState,useEffect } from "react";
export default function CheckoutForm(){
    const [postalCode,setPotalCode] = useState("");
    const [prefecture,setPrefecture] = useState("");
    const [city,setCity] = useState("");
    useEffect(() => {
        if(postalCode.length !== 7)return;
        const fetchAddress = async() => {
            const res = await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${postalCode}`);
            const data = await res.json();
            if(data.results){
                setPrefecture(data.results[0].address1);
                setCity(data.results[0].address2 + data.results[0].address3)
            }
        }
        fetchAddress()
    },[postalCode])
    const [state,formState] = useActionState(
        async(_prevstate:{success?:boolean,error?:string}|null,formData:FormData) => {
            return await createOrder(formData)
        },null
    );
    return(
        <form action={formState}>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">郵便番号</label>
                <input type="text" name="postalCode" value={postalCode} onChange={(e) => setPotalCode(e.target.value)} placeholder="1000001" className="w-full border border-gray-300 rounded-lg px-4 py-2.5"/>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">都道府県</label>
                <input type="text" name="prefecture" value={prefecture} onChange={(e) => setPrefecture(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2.5"/>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">市区町村</label>
                <input type="text" name="city" value={city} onChange={(e) => setCity(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2.5"/>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">番地</label>
                <input type="text" name="line1" className="w-full border border-gray-300 rounded-lg px-4 py-2.5" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">建物名、部屋番号など（任意）</label>
                <input type="text" name="line2" className="w-full border border-gray-300 rounded-lg px-4 py-2.5" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">お支払い方法</label>
                <select name="paymentMethod" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 mb-3">
                    <option value="CASH">代金引換</option>
                    <option value="CREDIT_CARD">クレジットカード</option>
                    <option value="BANK_TRANSFER">銀行振込</option>
                </select>
            </div>
            {state?.error && (
                <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
                {state.error}
            </p>
            )}
            <button type="submit" className="w-full py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition">注文確定</button>
        </form>
    )

}