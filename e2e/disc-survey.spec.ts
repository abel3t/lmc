import { expect, test } from '@playwright/test'

import {
  discAnswers,
  envelope,
  SURVEY_STORAGE,
  seedEveryLoad,
} from './storage-helpers'

const SURVEY_URL = '/disc/khao-sat'
const RESULT_URL = '/disc'
const STORAGE_KEY = SURVEY_STORAGE.disc.key

test.describe('DISC survey', () => {
  test('blocks submit when statements are unanswered', async ({ page }) => {
    await page.goto(SURVEY_URL)
    await expect(page.getByText('Khảo sát cá tính theo DISC')).toBeVisible()

    await expect(
      page.getByRole('button', { name: 'Xem kết quả' }),
    ).toBeDisabled()
  })

  test('completes the survey and shows the dominant profile', async ({
    page,
  }) => {
    await page.goto(SURVEY_URL)
    await expect(page.getByText('Khảo sát cá tính theo DISC')).toBeVisible()

    const radios = page.locator('input[type="radio"]')
    await expect(radios.first()).toBeAttached()
    expect(await radios.count()).toBe(100)

    for (let section = 0; section < 4; section++) {
      for (let index = 0; index < 5; index++) {
        await page
          .locator(`input[name="disc-${section}-${index}"][value="5"]`)
          .check({ force: true })
      }
    }

    await expect(
      page.getByRole('button', { name: 'Xem kết quả' }),
    ).toBeEnabled()

    await page.getByRole('button', { name: 'Xem kết quả' }).click()
    await page.waitForURL(`**${RESULT_URL}`)

    await expect(page.getByText('Kết quả DISC của bạn')).toBeVisible()
    await expect(page.getByText('Cá tính chính')).toBeVisible()
    await expect(page.getByText('D', { exact: true }).first()).toBeVisible()
    await expect(page.getByText('25/25').first()).toBeVisible()
  })
})

test.describe('DISC result page', () => {
  test('shows empty state without stored answers', async ({ page }) => {
    await page.goto(RESULT_URL)
    await expect(
      page.getByText('Chưa có kết quả. Làm khảo sát ngay nhé!'),
    ).toBeVisible()
  })

  test('renders profile from seeded answers', async ({ page }) => {
    // D = 5, I = 1, S = 3, C = 2 on every statement.
    await seedEveryLoad(page, {
      [STORAGE_KEY]: envelope(
        discAnswers((section) => [5, 1, 3, 2][section] ?? 1),
      ),
    })

    await page.goto(RESULT_URL)
    await expect(page.getByText('Kết quả DISC của bạn')).toBeVisible()
    await expect(page.getByText('Cá tính chính')).toBeVisible()
    await expect(page.getByText('D', { exact: true }).first()).toBeVisible()
  })

  test('shows D profile at 25/25 when only D section scores highest', async ({
    page,
  }) => {
    await seedEveryLoad(page, {
      [STORAGE_KEY]: envelope(
        discAnswers((section) => (section === 0 ? 5 : 1)),
      ),
    })

    await page.goto(RESULT_URL)
    await expect(page.getByText('25/25').first()).toBeVisible()
    await expect(page.getByText('Cá tính chính')).toBeVisible()
    await expect(page.getByText('D', { exact: true }).first()).toBeVisible()
  })
})
