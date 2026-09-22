import { test, expect } from '@playwright/test';

test('トップページが表示され、商品一覧が見える', async ({ page }) => {
  await page.goto('/');

  // 検索欄が表示されている
  await expect(page.getByPlaceholder('商品を検索')).toBeVisible();
  // 「すべて」カテゴリボタンが表示されている
  await expect(page.getByRole('link',{name:'すべて'})).toBeVisible();
   // 少なくとも1つ「カートに入れる」ボタンが表示されている
   await expect(page.getByRole('button',{name:'カートに入れる'}).first()).toBeVisible()

});
test('商品をクリックすると詳細ページに遷移する',async({page}) => {
  await page.goto('/');
  //商品のカードのリンクをクリック
  await page.getByRole('link',{name:/tシャツ/}).click();
  // URLが /products/ を含む形に変わっているか確認
  await expect(page).toHaveURL(/\/products\//);
   // 少なくとも1つ「カートに入れる」ボタンが表示されている
  await expect(page.getByRole('button',{name:'カートに入れる'}).first()).toBeVisible();
    // 少なくとも1つ「今すぐ買う」ボタンが表示されている
  await expect(page.getByRole('button',{name:'今すぐ買う'}).first()).toBeVisible();
  
})

