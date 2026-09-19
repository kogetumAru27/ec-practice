"use client";
import { createProducts,updateProducts } from "@/actions/Products";
import { useActionState,useState,useEffect } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { useRouter } from "next/navigation";
type Categories = {
    id:string,
    name:string
}
type ProductData = {
    id:string,
    name:string,
    price:number,
    description:string,
    categoryId:string,
    imageUrl:string | null
}
type Props = {
    categories:Categories[],
    initialData?:ProductData
}
export default function ProductForm({categories,initialData}:Props){
    const isEditmode = !!initialData;
    const [imageUrl,setImageUrl] = useState<string | null>(initialData?.imageUrl ?? null);
    const router = useRouter();
    const action = isEditmode
        ?updateProducts.bind(null,initialData.id)
        :createProducts;
        const [state,formState] = useActionState(
            async(_prevState:{success?:boolean,error?:string}|null,formData:FormData) => {
                return await action(formData)
            },null
        );
    useEffect(() => {
        if(state?.success){
            router.push("/admin")
        }
    },[state,router])
    return(
        <div className="max-w-xl mx-auto px-6 py-10">
    <h1 className="text-2xl font-bold text-gray-900 mb-8">{isEditmode ? "商品を編集" : "商品を追加"}</h1>
    
    <form action={formState} className="bg-white border border-gray-200 rounded-2xl p-8 flex flex-col gap-5">
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">商品名</label>
            <input 
                type="text" 
                name="name" 
                defaultValue={initialData?.name ?? ""}
                placeholder="例:オーガニックコットンTシャツ" 
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">画像</label>
            <CldUploadWidget uploadPreset="ec-practice" onSuccess={(result) => {
                const info = result.info as {secure_url:string}
                setImageUrl(info.secure_url);
            }}>
                {({ open }) => (
                    <button 
                        type="button" 
                        onClick={() => open()}
                        className="w-full border-2 border-dashed border-gray-300 rounded-lg py-8 text-gray-500 hover:border-emerald-500 hover:text-emerald-600 transition flex flex-col items-center gap-2"
                    >
                        <span className="text-2xl">📷</span>
                        <span className="text-sm">画像をアップロード</span>
                    </button>
                )}
            </CldUploadWidget>
            {imageUrl && (
                <p className="mt-2 text-xs text-emerald-600">画像がアップロードされました</p>
            )}
        </div>

        <input type="hidden" name="imageUrl" value={imageUrl ?? ""} />

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">価格</label>
            <div className="relative">
                <input 
                    type="number" 
                    min={0} 
                    defaultValue={initialData?.price ?? ""}
                    placeholder="2500" 
                    name="price"
                    className="w-full border border-gray-300 rounded-lg pl-4 pr-12 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">円</span>
            </div>
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">商品の特徴</label>
            <textarea 
                placeholder="商品の特徴を入力してください(15〜100文字)" 
                name="description"
                defaultValue={initialData?.description ?? ""}
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">カテゴリ</label>
            <select 
                name="categoryId"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
                <option value="">カテゴリを選択</option>
                {categories.map(category => (
                    <option value={category.id} key={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>
        </div>

        {state?.error && (
            <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
                {state.error}
            </p>
        )}

        <button 
            type="submit"
            className="w-full py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition"
        >
            {isEditmode ? "更新する" : "作成する"}
        </button>
    </form>
</div>
    )
}