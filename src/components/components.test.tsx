import { describe, expect, test } from 'bun:test'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DiscScaleLegend } from '@/components/DiscScaleLegend'
import { GiftResultMatrix } from '@/components/GiftResultMatrix'
import { GiftResultPanel } from '@/components/GiftResultPanel'
import { LikertRating } from '@/components/LikertRating'
import { SurveyPageShell } from '@/components/SurveyPageShell'
import { SurveyScaleLegend } from '@/components/SurveyScaleLegend'
import { SurveyTitleBar } from '@/components/SurveyTitleBar'
import { Button, ButtonLink, buttonClass } from '@/components/ui/button'
import { GiftType } from '@/constants/gift'
import {
  buildGiftMatrixFromScores,
  getQuestionIdsForGift,
} from '@/lib/gift-scoring'

describe('UI components', () => {
  test('buttonClass exposes every tone', () => {
    for (const tone of [
      'primary',
      'orange',
      'green',
      'rose',
      'neutral',
    ] as const) {
      expect(buttonClass(tone)).toContain('inline-flex')
    }
    expect(buttonClass('rose')).toContain('bg-rose-600')
  })

  test('Button renders with tone class', () => {
    render(<Button tone="green">Submit</Button>)
    expect(screen.getByRole('button', { name: 'Submit' })).toBeTruthy()
  })

  test('ButtonLink renders anchor with tone class', () => {
    render(
      <ButtonLink tone="rose" href="/test">
        Link
      </ButtonLink>,
    )
    const link = screen.getByRole('link', { name: 'Link' })
    expect(link.getAttribute('href')).toBe('/test')
    expect(link.className).toContain('bg-rose-600')
  })

  test('SurveyTitleBar renders title with tone', () => {
    render(<SurveyTitleBar tone="orange">Khảo sát</SurveyTitleBar>)
    expect(screen.getByText('Khảo sát')).toBeTruthy()
  })

  test('SurveyScaleLegend renders scale options for each tone', () => {
    const labels = [
      { value: 1, label: 'One' },
      { value: 2, label: 'Two' },
    ] as const

    for (const tone of ['green', 'orange', 'primary', 'rose'] as const) {
      const { unmount } = render(
        <SurveyScaleLegend tone={tone} title="Scale" labels={labels} />,
      )
      expect(screen.getByText('Scale')).toBeTruthy()
      expect(screen.getByText('One')).toBeTruthy()
      unmount()
    }
  })

  test('DiscScaleLegend renders DISC scale', () => {
    render(<DiscScaleLegend />)
    expect(screen.getByText('Thang điểm (1 → 5)')).toBeTruthy()
    expect(screen.getByText('Không bao giờ')).toBeTruthy()
  })

  test('SurveyPageShell wraps children', () => {
    render(
      <SurveyPageShell className="bg-gray-50">
        <p>Survey content</p>
      </SurveyPageShell>,
    )
    expect(screen.getByText('Survey content')).toBeTruthy()
  })

  test('LikertRating calls onChange when an option is selected', async () => {
    const user = userEvent.setup()
    let selected = 0

    render(
      <LikertRating
        name="test-q1"
        value={undefined}
        accent="orange"
        options={[
          { value: 1, label: 'Low' },
          { value: 2, label: 'High' },
        ]}
        onChange={(value) => {
          selected = value
        }}
      />,
    )

    await user.click(screen.getByText('High'))
    expect(selected).toBe(2)
  })

  test('GiftResultMatrix renders question scores in table cells', () => {
    const scores = Object.fromEntries(
      Array.from({ length: 133 }, (_, index) => [String(index + 1), 2]),
    )
    const rows = buildGiftMatrixFromScores(scores).slice(0, 1)

    render(<GiftResultMatrix rows={rows} />)
    expect(screen.getByText('BẢNG KẾT QUẢ')).toBeTruthy()
    expect(document.body.textContent).toContain('1=')
    expect(document.body.textContent).toContain('Tổng=14')
  })

  test('GiftResultPanel renders primary gift and detail cards', () => {
    const adminIds = getQuestionIdsForGift(GiftType.A)
    const scores = Object.fromEntries(
      Array.from({ length: 133 }, (_, index) => [
        String(index + 1),
        adminIds.includes(index + 1) ? 3 : 0,
      ]),
    )
    const rows = buildGiftMatrixFromScores(scores)

    render(<GiftResultPanel rows={rows} />)
    expect(screen.getByText('Ân tứ nổi bật')).toBeTruthy()
    expect(screen.getAllByText('Quản trị').length).toBeGreaterThan(0)
    expect(screen.getAllByTestId('gift-result-card').length).toBe(19)
  })

  test('GiftResultPanel shows empty primary state when all totals are zero', () => {
    const scores = Object.fromEntries(
      Array.from({ length: 133 }, (_, index) => [String(index + 1), 0]),
    )
    const rows = buildGiftMatrixFromScores(scores)

    render(<GiftResultPanel rows={rows} />)
    expect(screen.getAllByText('—').length).toBeGreaterThan(0)
  })
})
