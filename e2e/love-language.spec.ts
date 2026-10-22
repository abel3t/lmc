import { expect, test } from '@playwright/test'

import { LOVE_LANGUAGE_STORAGE_KEYS } from '../src/constants/love-language'

const SURVEY_URL = '/ngon-ngu-yeu-thuong/khao-sat'
const RESULT_URL = '/ngon-ngu-yeu-thuong'
const STORAGE_KEYS = LOVE_LANGUAGE_STORAGE_KEYS

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

  test('blocks submit when duplicate ranks exist in a group', async ({
    page,
  }) => {
    await page.goto(SURVEY_URL)

    const inputs = page.locator('input[type="number"]')
    await inputs.first().waitFor({ state: 'visible' })

    for (let group = 0; group < 5; group++) {
      for (let rank = 1; rank <= 5; rank++) {
        const input = inputs.nth(group * 5 + (rank - 1))
        await input.fill(String(rank === 2 ? 1 : rank))
      }
    }

    await expect(
      page.getByRole('button', { name: 'Xem kết quả' }),
    ).toBeDisabled()
  })

  test('highlights both duplicated marks in red', async ({ page }) => {
    await page.goto(SURVEY_URL)

    const inputs = page.locator('input[type="number"]')
    await inputs.first().waitFor({ state: 'visible' })

    await expect(async () => {
      await inputs.nth(0).fill('3')
      await inputs.nth(1).fill('3')
      await expect(inputs.nth(0)).toHaveAttribute('aria-invalid', 'true', {
        timeout: 1_000,
      })
    }).toPass()
    await expect(inputs.nth(1)).toHaveAttribute('aria-invalid', 'true')
    await expect(
      page.getByText('Mỗi số điểm từ 1 đến 5 chỉ được dùng một lần trong nhóm'),
    ).toBeVisible()

    await inputs.nth(1).fill('4')
    await expect(inputs.nth(0)).toHaveAttribute('aria-invalid', 'false')
    await expect(inputs.nth(1)).toHaveAttribute('aria-invalid', 'false')
  })

  test('accepts whole numbers only', async ({ page }) => {
    await page.goto(SURVEY_URL)

    const inputs = page.locator('input[type="number"]')
    await inputs.first().waitFor({ state: 'visible' })

    // Typing a decimal separator is blocked: "4.5" becomes "45" → out of range.
    await expect(async () => {
      await inputs.nth(0).fill('')
      await inputs.nth(0).pressSequentially('4.5')
      await expect(inputs.nth(0)).toHaveValue('45', { timeout: 1_000 })
    }).toPass()
    await expect(inputs.nth(0)).toHaveAttribute('aria-invalid', 'true')

    // A pasted decimal is kept visible and flagged, not truncated to 4.
    await inputs.nth(0).fill('4.5')
    await expect(inputs.nth(0)).toHaveValue('4.5')
    await expect(inputs.nth(0)).toHaveAttribute('aria-invalid', 'true')
    await expect(page.getByText('Chỉ nhập số nguyên từ 1 đến 5')).toBeVisible()

    await inputs.nth(0).fill('4')
    await expect(inputs.nth(0)).toHaveAttribute('aria-invalid', 'false')
    await expect(page.getByText('Chỉ nhập số nguyên từ 1 đến 5')).toHaveCount(0)
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
    await expect(
      page.getByRole('cell', { name: '25/25' }).first(),
    ).toBeVisible()
  })
})

test.describe('Love Language result page', () => {
  test('shows empty state when no answers are stored', async ({ page }) => {
    await page.goto(RESULT_URL)
    await expect(
      page.getByText('Chưa có kết quả. Làm khảo sát ngay nhé!'),
    ).toBeVisible()
  })

  test('renders totals from seeded answers', async ({ page }) => {
    await page.addInitScript(
      ({ key }) => {
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
      },
      { key: STORAGE_KEYS.result },
    )

    await page.goto(RESULT_URL)
    await expect(page.getByText('Ngôn ngữ nổi bật')).toBeVisible()
    await expect(page.locator('table tbody tr')).toHaveCount(5)
    await expect(page.locator('table tbody tr').first()).toContainText(
      'Lời nói ghi nhận',
    )
    await expect(
      page.getByRole('cell', { name: '25/25' }).first(),
    ).toBeVisible()
    await expect(page.getByRole('cell', { name: '5/25' }).last()).toBeVisible()
  })
})
