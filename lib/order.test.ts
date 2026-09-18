import { it,describe,expect } from "vitest";
import { createorderItems } from "./ordertest";
describe("createorderItems",() => {
    it("成功ならカートからオーダーが作られる",() => {
        const dummydata = {
            cartItems:[
                {productId:"product",quantity:2,product:{price:2500}},
                {productId:"pr3",quantity:5,product:{price:3000}}
            ],
            orderId:"order3"
        }
        const result = createorderItems(dummydata)
        expect(result).toEqual(    [
            {
            orderId:"order3",
            productId:"product",
            quantity:2,
            priceAtPurchase:2500},
            {orderId:"order3",
                productId:"pr3",
                quantity:5,
                priceAtPurchase:3000}
            ])  
    });
    it("カートアイテムが空の配列なら空の配列が入るはず" ,() => {
        const dummy = {cartItems:[],orderId:"4"}//dummyはカートを表している一人一つしかカートはないのでオブジェクトcartitemは何個もあるから配列
        const result = createorderItems(dummy)
        expect(result).toEqual([])
    })
    
})