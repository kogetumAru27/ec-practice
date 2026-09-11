import { z } from "zod"
export const sigInUpSchema = z.object({
    name:z.string().min(1,"ユーザーを入力してください"),
    email:z.email("正しいメールアドレスを入力してください"),
    password:z.string()
    .min(8,"パスワードは8文字以上で入力してください")
    .max(16,"パスワードは16文字以内で入力してください"),
    confirmpassword:z.string()
}).refine((data) => data.password === data.confirmpassword,{
    message:"パスワードが一致しません",
    path:["confirmpassword"]
})
export const loginSchema = z.object({
    email:z.email("正しいメールアドレスを入力してください"),
    password: z.string().min(1, "パスワードを入力してください"),
});
export const productsSchema = z.object({
    name:z.string().min(1,"商品名を入力してください"),
    description:z.string()
    .min(15,"特徴を入力してください")
    .max(100,"特徴は端的にお願いします"),
    categoryId:z.string().min(1,"カテゴリの選択は必須です"),
    price:z.coerce.number({error:"正しい価格を入力してください"}).positive("価格は0より大きい値にしてください"),
    imageUrl: z.string().optional(),
});
export const checkoutSchema = z.object({
    postalCode:z.string().min(1,"郵便番号を入力してください"),
    prefecture:z.string().min(1,"都道府県を入力してください"),
    city:z.string().min(1,"市区町村を入力してください"),
    line1:z.string().min(1,"番地を入力してください"),
    line2:z.string().optional(),
    paymentMethod:z.enum(["CASH","CREDIT_CARD","BANK_TRANSFER"],{error:"お支払い方法を選択してください"}),
})
export const changePasswordSchema = z.object({
    currentPass:z.string().min(1,"現在のパスワードを入力してください"),
    newPass:z.string()
    .min(8,"パスワードは8文字以上で入力してください")
    .max(16,"パスワードは16文字以内で入力してください"),
    confirmpassword:z.string()
}).refine((data) => data.newPass === data.confirmpassword,{
    message:"新しいパスワードが一致しません",
    path:["confirmpassword"]
})