import { expect, test } from '@playwright/test'

import {
  envelope,
  idAnswers,
  readStorage,
  SURVEY_STORAGE,
  seedEveryLoad,
} from './storage-helpers'

const SURVEY_URL = '/an-tu-thuoc-linh-next-gen/khao-sat'
const RESULT_URL = '/an-tu-thuoc-linh-next-gen'
const STORAGE_KEY = SURVEY_STORAGE.nextGenGift.key
const TOTAL_QUESTIONS = 57
const PER_PAGE = 10
const TOTAL_PAGES = Math.ceil(TOTAL_QUESTIONS / PER_PAGE)
const GIFT_CATEGORIES = 19
const RESULT_CARD = '[data-testid="next-gen-gift-result-card"]'

async function gotoSurveyPage(page: import('@playwright/test').Page) {
  await page.goto(SURVEY_URL)
  await page.evaluate(() => localStorage.clear())
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

    // Retry the click: the SSR button can be clicked before React hydrates.
    await expect(async () => {
      await page.getByRole('button', { name: 'Tiếp tục' }).click()
      await expect(
        page.getByText('Hãy trả lời tất cả câu hỏi nào!'),
      ).toBeVisible({ timeout: 1_000 })
    }).toPass()
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
    await expect(
      page.getByText('Kết quả ân tứ thuộc linh của em'),
    ).toBeVisible()
    await expect(page.locator(RESULT_CARD)).toHaveCount(GIFT_CATEGORIES)
    // Every answer = 2 → 3 questions × 2 = 6 per gift.
    await expect(page.locator(RESULT_CARD).first()).toContainText('6/9')

    // Only answers are saved, versioned, under the namespaced key.
    expect(await readStorage(page, STORAGE_KEY)).toEqual(
      envelope(idAnswers(TOTAL_QUESTIONS, () => 2)),
    )
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
    await seedEveryLoad(page, {
      [STORAGE_KEY]: envelope(idAnswers(TOTAL_QUESTIONS, () => 3)),
    })

    await page.goto(RESULT_URL)
    await expect(page.locator(RESULT_CARD)).toHaveCount(GIFT_CATEGORIES)
    await expect(page.locator(RESULT_CARD).first()).toContainText('9/9')
  })
})
