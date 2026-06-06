import { afterEach, describe, expect, mock, test } from 'bun:test'
import { cn, printWithoutBrowserHeader } from '@/lib/utils'

describe('utils', () => {
  test('cn merges class names and resolves tailwind conflicts', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4')
    expect(cn('text-red-500', false && 'hidden', 'font-bold')).toBe(
      'text-red-500 font-bold',
    )
  })

  describe('printWithoutBrowserHeader', () => {
    afterEach(() => {
      mock.restore()
    })

    test('clears document title for print and restores it', () => {
      document.title = 'Kết quả khảo sát'
      const printMock = mock(() => {})
      window.print = printMock

      printWithoutBrowserHeader()

      expect(document.title.trim()).toBe('')
      expect(printMock).toHaveBeenCalledTimes(1)

      window.dispatchEvent(new Event('afterprint'))
      expect(document.title).toBe('Kết quả khảo sát')
    })

    test('restores title via timeout when afterprint is not fired', async () => {
      document.title = 'Original'
      window.print = mock(() => {})

      printWithoutBrowserHeader()
      expect(document.title.trim()).toBe('')

      await new Promise((resolve) => setTimeout(resolve, 1100))
      expect(document.title).toBe('Original')
    })
  })
})
