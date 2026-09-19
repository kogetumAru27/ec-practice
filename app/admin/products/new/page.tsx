import { prisma } from "@/lib/prisma";
import ProductForm from "@/components/CreateProd";
export default async function NewProductPage(){//作成と、一覧を分ける必要がある、技術的には/adminに書いてもできる
    const categories = await prisma.category.findMany();
    return(
        <div>
            <ProductForm  categories={categories}/>
        </div>
    )
}