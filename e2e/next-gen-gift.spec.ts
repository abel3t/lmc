import { expect, test } from '@playwright/test'

import { NEXT_GEN_GIFT_STORAGE_KEYS } from '../src/constants/next-gen-gift'

const SURVEY_URL = '/an-tu-thuoc-linh-next-gen/khao-sat'
const RESULT_URL = '/an-tu-thuoc-linh-next-gen'
const STORAGE_KEY = NEXT_GEN_GIFT_STORAGE_KEYS.result
const TOTAL_QUESTIONS = 66
const PER_PAGE = 10
const TOTAL_PAGES = Math.ceil(TOTAL_QUESTIONS / PER_PAGE)
const GIFT_CATEGORIES = 22

async function gotoSurveyPage(page: import('@playwright/test').Page) {
  await page.goto(SURVEY_URL)
  await page.evaluate((keys) => {
    for (const key of keys) {
      localStorage.removeItem(key)
    }
  }, Object.values(NEXT_GEN_GIFT_STORAGE_KEYS))
  await page.reload()
  await page
    .locator('input[type="radio"]')
    .first()
    .waitFor({ state: 'visible' })
}

async function answerCurrentPage(
  page: import('@playwright/test').Page,
  value: number,
) {
  const labels = page.locator(
    `label:has(input[type="radio"][value="${value}"])`,
  )
  await labels.first().waitFor({ state: 'visible' })
  const count = await labels.count()
  for (let i = 0; i < count; i++) {
    await labels.nth(i).click()
  }
  return count
}

test.describe('Next Gen Gift survey', () => {
  test('blocks advancing when the page is not fully answered', async ({
    page,
  }) => {
    await gotoSurveyPage(page)
    await expect(page.getByText('Ân tứ thuộc linh')).toBeVisible()

    await page.getByRole('button', { name: 'Tiếp tục' }).click()
    await expect(
      page.getByText('Hãy trả lời tất cả câu hỏi nào!'),
    ).toBeVisible()
  })

  test('completes the full flow and shows ranked results', async ({ page }) => {
    test.setTimeout(60_000)
    await gotoSurveyPage(page)

    for (let pageNum = 1; pageNum <= TOTAL_PAGES; pageNum++) {
      const answered = await answerCurrentPage(page, 2)
      expect(answered).toBeGreaterThan(0)

      if (pageNum < TOTAL_PAGES) {
        await page.getByRole('button', { name: 'Tiếp tục' }).click()
      } else {
        await page.getByRole('button', { name: 'Xem kết quả' }).click()
      }
    }

    await page.waitForURL(`**${RESULT_URL}`)
    await expect(page.getByText('Kết quả của bạn')).toBeVisible()
    await expect(page.locator('table tbody tr')).toHaveCount(GIFT_CATEGORIES)
    await expect(page.getByText('6').first()).toBeVisible()
  })
})

test.describe('Next Gen Gift result page', () => {
  test('shows empty state when no answers are stored', async ({ page }) => {
    await page.goto(RESULT_URL)
    await expect(
      page.getByText('Chưa có kết quả. Làm khảo sát ngay nhé!'),
    ).toBeVisible()
  })

  test('renders aggregates from seeded answers', async ({ page }) => {
    await page.addInitScript(
      ({ key, total }) => {
        const result: Record<string, { type: number; mark: number }> = {}
        for (let i = 1; i <= total; i++) {
          result[String(i)] = { type: (i - 1) % 22, mark: 3 }
        }
        localStorage.setItem(key, JSON.stringify(result))
      },
      { key: STORAGE_KEY, total: TOTAL_QUESTIONS },
    )

    await page.goto(RESULT_URL)
    await expect(page.locator('table tbody tr')).toHaveCount(GIFT_CATEGORIES)
    await expect(page.getByRole('cell', { name: '9' }).first()).toBeVisible()
  })
})
