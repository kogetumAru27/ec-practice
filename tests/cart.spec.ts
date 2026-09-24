import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto('/login');
  await page.getByPlaceholder('メールアドレス').fill('test@example.com');
  await page.locator('input[name="password"]').fill('password12345');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page).toHaveURL('/');
});

test('商品をカートに追加すると、バッジの数が1つ増える', async ({ page }) => {
  await page.goto('/');

  // 現在のカートバッジの数を取得(バッジがなければ0とみなす)
  const cartLink = page.getByRole('link', { name: 'カート' });
  const beforeText = await cartLink.textContent();
  const beforeCount = parseInt(beforeText?.match(/\d+/)?.[0] ?? '0', 10);

  // tシャツをカートに追加
  await page.getByRole('link', { name: /tシャツ/ }).locator('..').getByRole('button', { name: 'カートに入れる' }).click();

  // バッジの数が1つ増えていることを確認
  await expect(cartLink).toContainText(String(beforeCount + 1));

  // カートページへ移動して、tシャツが表示されていることを確認
  await cartLink.click();
  await expect(page).toHaveURL(/\/cart/);
  await expect(page.getByText('tシャツ').first()).toBeVisible();
});