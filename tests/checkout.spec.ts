import { test, expect } from "@playwright/test";
test.beforeEach(async({page,context}) => {
    await context.clearCookies();
    await page.goto('/login');
    await page.getByPlaceholder('メールアドレス').fill('test@example.com');
    await page.locator('input[name="password"]').fill('password12345');
    await page.getByRole('button',{name:'Sign in'}).click();
    await expect(page).toHaveURL('/')
})
test('カートから注文確定まで完了できる',async ({page}) => {
    await page.goto('/');
    await page.getByRole('link',{name:/tシャツ/}).locator('..').getByRole('button',{name:"カートに入れる"}).click();
    await page.getByRole('link',{name:'カート'}).click();
    await expect(page).toHaveURL(/\/cart/);
    await page.getByRole('link',{name:"レジに進む"}).click();
    await expect(page).toHaveURL(/\/checkout/);
    await page.locator('label:has-text("郵便番号") + input').fill('1500001');
    await page.locator('label:has-text("都道府県") + input').fill('東京都');
    await page.locator('label:has-text("市区町村") + input').fill('渋谷区');
    await page.locator('label:has-text("番地") + input').fill('1-1-1');
  
    await page.getByRole('button', { name: '注文確定' }).click();
  
    await expect(page).toHaveURL(/\/order\/complete/);
})