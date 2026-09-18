import { describe,it,expect } from "vitest";
import { loginSchema } from "./validation";
import { sigInUpSchema } from "./validation";
describe("loginSchema",() => {
    it("正しいメールアドレスとパスワードなら合格",() => {
        const result = loginSchema.safeParse({
            email:"test@icloud.com",
            password:"qs"
        })
        expect((result.success)).toBe(true)
    });
    it("ログインできたら合格", () => {
        const result = sigInUpSchema.safeParse({
            name:"お",
            email:"12345@icloud.com",
            password:"1234567123456789",
            confirmpassword:"1234567123456789"
        })
        expect((result.success)).toBe(true)
    })
})