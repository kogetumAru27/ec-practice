import { describe,it,expect } from "vitest";
import { calculateCartTotal } from "./calculations";
describe("calculateCartTotal", () => {
    it("正しい計算なら合格", () => {
        const dummyCartItems = [
            {
                product: { price: 2500 },
                quantity: 2,
            },
            {
                product: { price: 500 },
                quantity: 1,
            },
        ];
        const total = calculateCartTotal(dummyCartItems);
        expect(total).toBe(5500);
    })
})
