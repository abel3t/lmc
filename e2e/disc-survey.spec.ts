import { expect, test } from '@playwright/test'

import { DISC_STORAGE_KEYS } from '../src/constants/disc'

const SURVEY_URL = '/disc/khao-sat'
const RESULT_URL = '/disc'
const STORAGE_KEYS = DISC_STORAGE_KEYS

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
    await page.addInitScript(
      ({ keys }) => {
        const sections = [
          {
            type: 0,
            statements: Array.from({ length: 5 }, () => ({ value: 5 })),
          },
          {
            type: 1,
            statements: Array.from({ length: 5 }, () => ({ value: 1 })),
          },
          {
            type: 2,
            statements: Array.from({ length: 5 }, () => ({ value: 3 })),
          },
          {
            type: 3,
            statements: Array.from({ length: 5 }, () => ({ value: 2 })),
          },
        ]
        localStorage.setItem(keys.answers, JSON.stringify(sections))

        const result: Record<string, unknown> = {}
        sections.forEach((section) => {
          section.statements.forEach((statement, index) => {
            result[`${section.type}-${index}`] = {
              section: section.type,
              statementIndex: index,
              value: statement.value,
            }
          })
        })
        localStorage.setItem(keys.result, JSON.stringify(result))
      },
      { keys: STORAGE_KEYS },
    )

    await page.goto(RESULT_URL)
    await expect(page.getByText('Kết quả DISC của bạn')).toBeVisible()
    await expect(page.getByText('Tổ hợp tính cách của bạn:')).toBeVisible()
    await expect(page.getByText('D', { exact: true }).first()).toBeVisible()
  })

  test('shows D profile at 25/25 when only D section scores highest', async ({
    page,
  }) => {
    await page.addInitScript(
      ({ keys }) => {
        const sections = [
          {
            type: 0,
            statements: Array.from({ length: 5 }, () => ({ value: 5 })),
          },
          {
            type: 1,
            statements: Array.from({ length: 5 }, () => ({ value: 1 })),
          },
          {
            type: 2,
            statements: Array.from({ length: 5 }, () => ({ value: 1 })),
          },
          {
            type: 3,
            statements: Array.from({ length: 5 }, () => ({ value: 1 })),
          },
        ]
        localStorage.setItem(keys.answers, JSON.stringify(sections))

        const result: Record<string, unknown> = {}
        sections.forEach((section) => {
          section.statements.forEach((statement, index) => {
            result[`${section.type}-${index}`] = {
              section: section.type,
              statementIndex: index,
              value: statement.value,
            }
          })
        })
        localStorage.setItem(keys.result, JSON.stringify(result))
      },
      { keys: STORAGE_KEYS },
    )

    await page.goto(RESULT_URL)
    await expect(page.getByText('25/25').first()).toBeVisible()
    await expect(page.getByText('Cá tính chính')).toBeVisible()
    await expect(page.getByText('D', { exact: true }).first()).toBeVisible()
  })
})
