import { expect, test } from '@playwright/test'

import { GIFT_STORAGE_KEYS } from '../src/constants/gift'

import { ADMINISTRATION_QUESTION_IDS } from '../src/lib/gift-matrix.fixtures'

const SURVEY_URL = '/an-tu-thuoc-linh/khao-sat'
const RESULT_URL = '/an-tu-thuoc-linh'
const STORAGE_KEY = GIFT_STORAGE_KEYS.answers
const TOTAL_QUESTIONS = 133
const PER_PAGE = 10
const TOTAL_PAGES = Math.ceil(TOTAL_QUESTIONS / PER_PAGE)
const GIFT_CATEGORIES = 19

/** Select the same Likert value for every question on the current page. */
async function answerCurrentPage(
  page: import('@playwright/test').Page,
  value: number,
) {
  const labels = page.locator(
    `label:has(input[type="radio"][value="${value}"])`,
  )
  // Questions render client-side, so wait for them before counting/clicking.
  await labels.first().waitFor({ state: 'visible' })
  const count = await labels.count()
  for (let i = 0; i < count; i++) {
    await labels.nth(i).click()
  }
  return count
}

test.describe('Spiritual Gift survey', () => {
  test('blocks advancing when the page is not fully answered', async ({
    page,
  }) => {
    await page.goto(SURVEY_URL)
    await expect(page.getByText('Bảng đánh giá ân tứ thuộc linh')).toBeVisible()

    await page.getByRole('button', { name: 'Tiếp tục' }).click()

    await expect(
      page.getByText('Hãy trả lời tất cả câu hỏi nào!'),
    ).toBeVisible()
  })

  test('persists answers across a reload', async ({ page }) => {
    await page.goto(SURVEY_URL)

    const answered = await answerCurrentPage(page, 2)
    expect(answered).toBe(PER_PAGE)

    // Advancing triggers persistence to localStorage.
    await page.getByRole('button', { name: 'Tiếp tục' }).click()

    const stored = await page.evaluate(
      (key) => localStorage.getItem(key),
      STORAGE_KEY,
    )
    expect(stored).toContain('"1":2')

    await page.reload()
    await expect(
      page.locator('input[name="gift-q-1"][value="2"]'),
    ).toBeChecked()
  })

  test('completes the full flow and shows the result matrix', async ({
    page,
  }) => {
    test.setTimeout(60_000)
    await page.goto(SURVEY_URL)

    for (let p = 1; p <= TOTAL_PAGES; p++) {
      const answered = await answerCurrentPage(page, 2)
      expect(answered).toBeGreaterThan(0)

      if (p < TOTAL_PAGES) {
        await page.getByRole('button', { name: 'Tiếp tục' }).click()
      } else {
        await page.getByRole('button', { name: 'Xem kết quả' }).click()
      }
    }

    await page.waitForURL(`**${RESULT_URL}`)
    await expect(
      page.getByText('Kết quả ân tứ thuộc linh của bạn'),
    ).toBeVisible()
    await expect(page.getByTestId('gift-result-card')).toHaveCount(
      GIFT_CATEGORIES,
    )
    await expect(page.locator('table tbody tr')).toHaveCount(GIFT_CATEGORIES)
  })
})

test.describe('Spiritual Gift result page', () => {
  test('shows an empty state when no answers are stored', async ({ page }) => {
    await page.goto(RESULT_URL)
    await expect(
      page.getByText('Chưa có kết quả. Làm khảo sát ngay nhé!'),
    ).toBeVisible()
  })

  test('renders the matrix from seeded answers', async ({ page }) => {
    await page.addInitScript(
      ({ key, total }) => {
        const answers: Record<string, number> = {}
        for (let i = 1; i <= total; i++) answers[String(i)] = 2
        localStorage.setItem(key, JSON.stringify(answers))
      },
      { key: STORAGE_KEY, total: TOTAL_QUESTIONS },
    )

    await page.goto(RESULT_URL)

    await expect(page.getByTestId('gift-result-card')).toHaveCount(
      GIFT_CATEGORIES,
    )
    await expect(page.locator('table tbody tr')).toHaveCount(GIFT_CATEGORIES)
    await expect(page.getByText('14/21').first()).toBeVisible()
  })

  test('ranks Quản trị first when only administration questions score highest', async ({
    page,
  }) => {
    await page.addInitScript(
      ({ key, adminIds, total }) => {
        const answers: Record<string, number> = {}
        for (let i = 1; i <= total; i++) {
          answers[String(i)] = adminIds.includes(i) ? 3 : 0
        }
        localStorage.setItem(key, JSON.stringify(answers))
      },
      {
        key: STORAGE_KEY,
        adminIds: ADMINISTRATION_QUESTION_IDS,
        total: TOTAL_QUESTIONS,
      },
    )

    await page.goto(RESULT_URL)

    await expect(page.getByText('Quản trị').first()).toBeVisible()
    await expect(page.getByText('21/21').first()).toBeVisible()
    await expect(page.getByText('Ân tứ nổi bật', { exact: true })).toBeVisible()
  })

  test('blocks submit on last page until all 133 questions are answered', async ({
    page,
  }) => {
    test.setTimeout(60_000)
    await page.goto(SURVEY_URL)

    // Answer and advance through pages 1–13 only (130 questions).
    for (let p = 1; p < TOTAL_PAGES; p++) {
      await answerCurrentPage(page, 2)
      await page.getByRole('button', { name: 'Tiếp tục' }).click()
    }

    // Last page: answer only the first question, leave the rest blank.
    const firstRadio = page
      .locator('label:has(input[type="radio"][value="2"])')
      .first()
    await firstRadio.waitFor({ state: 'visible' })
    await firstRadio.click()

    await expect(
      page.getByRole('button', { name: 'Xem kết quả' }),
    ).toBeDisabled()
  })
})
