import { expect, test } from '@playwright/test'

import {
  discAnswers,
  envelope,
  idAnswers,
  LEGACY_STORAGE_KEYS,
  loveLanguageAnswers,
  readStorage,
  SURVEY_STORAGE,
  seedEveryLoad,
  seedOnce,
  storageKeys,
} from './storage-helpers'

const EMPTY_STATE = 'Chưa có kết quả. Làm khảo sát ngay nhé!'

test.describe('Legacy storage import', () => {
  test('DISC: legacy discAnswers shows the result and moves to lmc:disc', async ({
    page,
  }) => {
    const sections = [5, 1, 3, 2].map((value, type) => ({
      type,
      statements: Array.from({ length: 5 }, () => ({ value, hasError: false })),
    }))
    await seedOnce(page, { discAnswers: sections, discResult: { stale: 1 } })

    await page.goto('/disc')
    await expect(page.getByText('Kết quả DISC của bạn')).toBeVisible()
    await expect(page.getByText('25/25').first()).toBeVisible()

    expect(await storageKeys(page)).toEqual([SURVEY_STORAGE.disc.key])
    expect(await readStorage(page, SURVEY_STORAGE.disc.key)).toEqual(
      envelope(discAnswers((section) => [5, 1, 3, 2][section] ?? 0)),
    )
  })

  test('Gift: legacy giftAnswers shows the result and moves to lmc:gift', async ({
    page,
  }) => {
    await seedOnce(page, {
      giftAnswers: idAnswers(133, () => 2),
      giftResultV2: { stale: 1 },
    })

    await page.goto('/an-tu-thuoc-linh')
    await expect(page.getByTestId('gift-result-card')).toHaveCount(19)
    await expect(page.getByText('14/21').first()).toBeVisible()

    expect(await storageKeys(page)).toEqual([SURVEY_STORAGE.gift.key])
  })

  test('Next gen: legacy V2 questions show the result and move to lmc:next-gen-gift', async ({
    page,
  }) => {
    const legacy = Object.fromEntries(
      Array.from({ length: 57 }, (_, index) => [
        String(index + 1),
        { id: index + 1, text: 'old text', type: index % 19, value: 1 },
      ]),
    )
    await seedOnce(page, {
      nextGenGiftQuestionsV2: legacy,
      nextGenGiftResultV2: { stale: 1 },
    })

    await page.goto('/an-tu-thuoc-linh-next-gen')
    await expect(
      page.locator('[data-testid="next-gen-gift-result-card"]'),
    ).toHaveCount(19)
    await expect(
      page.locator('[data-testid="next-gen-gift-result-card"]').first(),
    ).toContainText('3/9')

    expect(await storageKeys(page)).toEqual([SURVEY_STORAGE.nextGenGift.key])
    expect(await readStorage(page, SURVEY_STORAGE.nextGenGift.key)).toEqual(
      envelope(idAnswers(57, () => 1)),
    )
  })

  test('Love language: legacy V2 answers show the result', async ({ page }) => {
    const legacy = Object.fromEntries(
      [1, 2, 3, 4, 5].map((id) => [
        String(id),
        {
          id,
          answers: [0, 1, 2, 3, 4].map((type) => ({ type, mark: 5 - type })),
        },
      ]),
    )
    await seedOnce(page, {
      loveLanguageQuestionsV2: legacy,
      loveLanguageResultV2: { stale: 1 },
    })

    await page.goto('/ngon-ngu-yeu-thuong')
    await expect(page.locator('table tbody tr').first()).toContainText(
      'Lời nói ghi nhận',
    )
    await expect(page.getByRole('cell', { name: '25/25' })).toBeVisible()

    expect(await storageKeys(page)).toEqual([SURVEY_STORAGE.loveLanguage.key])
    expect(await readStorage(page, SURVEY_STORAGE.loveLanguage.key)).toEqual(
      envelope(loveLanguageAnswers()),
    )
  })

  test('Love language: unversioned legacy data is dropped (ambiguous scale)', async ({
    page,
  }) => {
    const legacy = Object.fromEntries(
      [1, 2, 3, 4, 5].map((id) => [
        String(id),
        {
          id,
          answers: [0, 1, 2, 3, 4].map((type) => ({ type, mark: type + 1 })),
        },
      ]),
    )
    await seedOnce(page, {
      loveLanguageQuestions: legacy,
      loveLanguageResult: { '0': { type: 0, mark: 25 } },
    })

    await page.goto('/ngon-ngu-yeu-thuong')
    await expect(page.getByText(EMPTY_STATE)).toBeVisible()
    expect(await storageKeys(page)).toEqual([])
  })

  test('the survey page also imports legacy data and restores answers', async ({
    page,
  }) => {
    const legacy = Object.fromEntries(
      [1, 2, 3, 4, 5].map((id) => [
        String(id),
        {
          id,
          answers: [0, 1, 2, 3, 4].map((type) => ({ type, mark: 5 - type })),
        },
      ]),
    )
    await seedOnce(page, { loveLanguageQuestionsV2: legacy })

    await page.goto('/ngon-ngu-yeu-thuong/khao-sat')
    const inputs = page.locator('input[type="number"]')
    await expect(inputs.nth(0)).toHaveValue('5')
    await expect(inputs.nth(4)).toHaveValue('1')
    await expect(inputs.nth(24)).toHaveValue('1')
    expect(await storageKeys(page)).toEqual([SURVEY_STORAGE.loveLanguage.key])
  })

  test('leaves localStorage keys of other apps untouched', async ({ page }) => {
    await seedOnce(page, {
      somethingElse: 'keep',
      discAnswers: [],
    })

    await page.goto('/disc')
    await expect(page.getByText(EMPTY_STATE)).toBeVisible()
    expect(await storageKeys(page)).toEqual(['somethingElse'])
  })

  test('every legacy key is cleaned up once each survey is opened', async ({
    page,
  }) => {
    const legacy = Object.fromEntries(
      Object.values(LEGACY_STORAGE_KEYS)
        .flat()
        .map((key) => [key, { stale: true }]),
    )
    await seedOnce(page, legacy)

    for (const url of [
      '/disc',
      '/an-tu-thuoc-linh',
      '/an-tu-thuoc-linh-next-gen',
      '/ngon-ngu-yeu-thuong',
    ]) {
      await page.goto(url)
      await expect(page.getByText(EMPTY_STATE)).toBeVisible()
    }
    expect(await storageKeys(page)).toEqual([])
  })
})

test.describe('Versioned storage', () => {
  test('restores saved answers on each survey page', async ({ page }) => {
    await seedEveryLoad(page, {
      [SURVEY_STORAGE.disc.key]: envelope(discAnswers(() => 4)),
      [SURVEY_STORAGE.nextGenGift.key]: envelope(idAnswers(57, () => 0)),
      [SURVEY_STORAGE.gift.key]: envelope(idAnswers(133, () => 3)),
      [SURVEY_STORAGE.loveLanguage.key]: envelope(loveLanguageAnswers()),
    })

    await page.goto('/disc/khao-sat')
    await expect(
      page.locator('input[name="disc-0-0"][value="4"]'),
    ).toBeChecked()
    await expect(
      page.locator('input[name="disc-3-4"][value="4"]'),
    ).toBeChecked()

    await page.goto('/an-tu-thuoc-linh-next-gen/khao-sat')
    await expect(
      page.locator('input[type="radio"][value="0"]').first(),
    ).toBeChecked()

    await page.goto('/an-tu-thuoc-linh/khao-sat')
    await expect(
      page.locator('input[name="gift-q-1"][value="3"]'),
    ).toBeChecked()

    await page.goto('/ngon-ngu-yeu-thuong/khao-sat')
    await expect(page.locator('input[type="number"]').first()).toHaveValue('5')
  })

  test('ignores data saved by a newer app version and keeps it', async ({
    page,
  }) => {
    const future = envelope(
      discAnswers(() => 5),
      99,
    )
    await seedOnce(page, { [SURVEY_STORAGE.disc.key]: future })

    await page.goto('/disc')
    await expect(page.getByText(EMPTY_STATE)).toBeVisible()
    expect(await readStorage(page, SURVEY_STORAGE.disc.key)).toEqual(future)
  })

  test('shows the empty state for corrupt or unversioned data', async ({
    page,
  }) => {
    await seedOnce(page, {
      [SURVEY_STORAGE.disc.key]: '{not json',
      [SURVEY_STORAGE.gift.key]: idAnswers(133, () => 2),
      [SURVEY_STORAGE.loveLanguage.key]: envelope('garbage'),
      [SURVEY_STORAGE.nextGenGift.key]: envelope([1, 2, 3]),
    })

    for (const url of [
      '/disc',
      '/an-tu-thuoc-linh',
      '/ngon-ngu-yeu-thuong',
      '/an-tu-thuoc-linh-next-gen',
    ]) {
      await page.goto(url)
      await expect(page.getByText(EMPTY_STATE)).toBeVisible()
    }
  })

  test('incomplete answers do not produce a result', async ({ page }) => {
    const disc = discAnswers(() => 3)
    delete disc['2-2']
    const love = loveLanguageAnswers()
    love['5'] = { '0': 5 }
    await seedOnce(page, {
      [SURVEY_STORAGE.disc.key]: envelope(disc),
      [SURVEY_STORAGE.gift.key]: envelope(idAnswers(132, () => 2)),
      [SURVEY_STORAGE.nextGenGift.key]: envelope(idAnswers(56, () => 2)),
      [SURVEY_STORAGE.loveLanguage.key]: envelope(love),
    })

    for (const url of [
      '/disc',
      '/an-tu-thuoc-linh',
      '/an-tu-thuoc-linh-next-gen',
      '/ngon-ngu-yeu-thuong',
    ]) {
      await page.goto(url)
      await expect(page.getByText(EMPTY_STATE)).toBeVisible()
    }
  })

  test('love language: retaking the survey replaces the saved result', async ({
    page,
  }) => {
    await seedOnce(page, {
      [SURVEY_STORAGE.loveLanguage.key]: envelope(loveLanguageAnswers()),
    })

    await page.goto('/ngon-ngu-yeu-thuong')
    await expect(page.locator('table tbody tr').first()).toContainText(
      'Lời nói ghi nhận',
    )

    await page.getByRole('link', { name: 'Làm lại khảo sát' }).click()
    const inputs = page.locator('input[type="number"]')
    await expect(inputs.first()).toHaveValue('5')

    // Flip every group so E (Tiếp xúc đụng chạm) becomes the top language.
    for (let group = 0; group < 5; group++) {
      for (let type = 0; type < 5; type++) {
        await inputs.nth(group * 5 + type).fill(String(type + 1))
      }
    }
    await page.getByRole('button', { name: 'Xem kết quả' }).click()
    await page.waitForURL('**/ngon-ngu-yeu-thuong')

    await expect(page.locator('table tbody tr').first()).toContainText(
      'Tiếp xúc đụng chạm',
    )
    const marks = { '0': 1, '1': 2, '2': 3, '3': 4, '4': 5 }
    expect(await readStorage(page, SURVEY_STORAGE.loveLanguage.key)).toEqual(
      envelope({ '1': marks, '2': marks, '3': marks, '4': marks, '5': marks }),
    )
  })

  test('DISC: submitting saves answers only, under lmc:disc v1', async ({
    page,
  }) => {
    await seedOnce(page, {})
    await page.goto('/disc/khao-sat')

    await expect(async () => {
      for (let section = 0; section < 4; section++) {
        for (let index = 0; index < 5; index++) {
          await page
            .locator(
              `input[name="disc-${section}-${index}"][value="${section + 2}"]`,
            )
            .check({ force: true })
        }
      }
      await expect(
        page.getByRole('button', { name: 'Xem kết quả' }),
      ).toBeEnabled({ timeout: 1_000 })
    }).toPass()

    await page.getByRole('button', { name: 'Xem kết quả' }).click()
    await page.waitForURL('**/disc')
    await expect(page.getByText('Kết quả DISC của bạn')).toBeVisible()

    expect(await storageKeys(page)).toEqual([SURVEY_STORAGE.disc.key])
    expect(await readStorage(page, SURVEY_STORAGE.disc.key)).toEqual(
      envelope(discAnswers((section) => section + 2)),
    )
  })
})
