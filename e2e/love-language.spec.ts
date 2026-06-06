import { expect, test } from '@playwright/test'

import { LOVE_LANGUAGE_STORAGE_KEYS } from '../src/constants/love-language'

const SURVEY_URL = '/ngon-ngu-yeu-thuong/khao-sat'
const RESULT_URL = '/ngon-ngu-yeu-thuong'
const STORAGE_KEY = LOVE_LANGUAGE_STORAGE_KEYS.result

test.describe('Love Language survey', () => {
  test('blocks submit when groups are incomplete', async ({ page }) => {
    await page.goto(SURVEY_URL)
    await expect(
      page.getByText('Ngôn ngữ yêu thương', { exact: true }),
    ).toBeVisible()

    await expect(
      page.getByRole('button', { name: 'Xem kết quả' }),
    ).toBeDisabled()
  })

  test('completes all five groups with unique ranks and shows results', async ({
    page,
  }) => {
    await page.goto(SURVEY_URL)

    const inputs = page.locator('input[type="number"]')
    await inputs.first().waitFor({ state: 'visible' })
    expect(await inputs.count()).toBe(25)

    for (let group = 0; group < 5; group++) {
      for (let rank = 1; rank <= 5; rank++) {
        const input = inputs.nth(group * 5 + (rank - 1))
        await input.fill(String(rank))
        await input.blur()
      }
    }

    await page.getByRole('button', { name: 'Xem kết quả' }).click()
    await page.waitForURL(`**${RESULT_URL}`)

    await expect(
      page.getByText('Kết quả ngôn ngữ yêu thương của bạn'),
    ).toBeVisible()
    await expect(page.locator('table tbody tr')).toHaveCount(5)
    await expect(page.getByRole('cell', { name: '25' }).first()).toBeVisible()
  })
})

test.describe('Love Language result page', () => {
  test('renders totals from seeded answers', async ({ page }) => {
    await page.addInitScript((key) => {
      localStorage.setItem(
        key,
        JSON.stringify({
          '0': { type: 0, mark: 25 },
          '1': { type: 1, mark: 20 },
          '2': { type: 2, mark: 15 },
          '3': { type: 3, mark: 10 },
          '4': { type: 4, mark: 5 },
        }),
      )
    }, STORAGE_KEY)

    await page.goto(RESULT_URL)
    await expect(page.getByText('Lời nói ghi nhận')).toBeVisible()
    await expect(page.getByRole('cell', { name: '25' }).first()).toBeVisible()
    await expect(page.getByRole('cell', { name: '5' }).last()).toBeVisible()
  })
})
