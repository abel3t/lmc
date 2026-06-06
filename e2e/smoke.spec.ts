import { expect, test } from '@playwright/test'

test.describe('Smoke', () => {
  test('home lists the available surveys and links work', async ({ page }) => {
    await page.goto('/')
    await expect(
      page.getByRole('heading', { name: 'Website khảo sát' }),
    ).toBeVisible()
    await expect(page.getByText('Chào mừng bạn')).toBeVisible()

    await expect(
      page.getByRole('link', { name: /Ân tứ thuộc linh/ }).first(),
    ).toBeVisible()
    await expect(
      page.getByRole('link', { name: /Khảo sát cá tính DISC/ }),
    ).toBeVisible()

    await page.getByRole('link', { name: /Khảo sát cá tính DISC/ }).click()
    await page.waitForURL('**/disc')
    // /disc is the results index; with no stored answers it shows the empty state.
    await expect(
      page.getByText('Chưa có kết quả. Làm khảo sát ngay nhé!'),
    ).toBeVisible()
  })

  test('DISC survey renders questions with rating inputs', async ({ page }) => {
    await page.goto('/disc/khao-sat')
    await expect(page.getByText('Khảo sát cá tính theo DISC')).toBeVisible()
    await expect(page.locator('input[type="radio"]').first()).toBeAttached()
  })
})
