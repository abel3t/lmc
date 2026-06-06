import { createFileRoute, Link } from '@tanstack/react-router'
import { ChevronRight } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: Home,
})

const surveys = [
  {
    to: '/an-tu-thuoc-linh',
    title: 'Ân tứ thuộc linh',
    subtitle: 'Dành cho người lớn',
    description: '133 câu hỏi · 19 nhóm ân tứ',
    accent: 'border-l-orange-500',
    hover: 'hover:border-orange-300 hover:bg-orange-50/50',
  },
  {
    to: '/an-tu-thuoc-linh-next-gen',
    title: 'Ân tứ thuộc linh (Next Gen)',
    subtitle: 'Dành cho thiếu niên',
    description: '66 câu hỏi · 22 nhóm ân tứ',
    accent: 'border-l-orange-400',
    hover: 'hover:border-orange-300 hover:bg-orange-50/50',
  },
  {
    to: '/disc',
    title: 'Khảo sát cá tính DISC',
    subtitle: 'DISC Personality Survey',
    description: '20 nhận định · 4 nhóm tính cách',
    accent: 'border-l-emerald-600',
    hover: 'hover:border-emerald-300 hover:bg-emerald-50/50',
  },
  {
    to: '/ngon-ngu-yeu-thuong',
    title: 'Ngôn ngữ yêu thương',
    subtitle: 'Love Languages',
    description: 'Khám phá cách bạn cho và nhận tình yêu',
    accent: 'border-l-blue-600',
    hover: 'hover:border-blue-300 hover:bg-blue-50/50',
  },
] as const

function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-50">
      <header className="border-b border-gray-200 bg-white px-4 py-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
          Môn Kỹ Năng Mục Vụ
        </p>
        <h1 className="mt-1 text-xl font-bold text-gray-900 sm:text-2xl">
          Website khảo sát
        </h1>
      </header>

      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-8 sm:px-6">
        <h2 className="text-lg font-semibold text-gray-900">Chào mừng bạn</h2>
        <p className="mt-1 text-sm leading-relaxed text-gray-600 sm:text-base">
          Chọn một khảo sát bên dưới để bắt đầu. Kết quả được lưu trên trình
          duyệt của bạn.
        </p>

        <ul className="mt-6 space-y-3">
          {surveys.map((survey) => (
            <li key={survey.to}>
              <Link
                to={survey.to}
                className={`group flex items-center gap-4 rounded-lg border border-gray-200 border-l-4 bg-white p-4 shadow-sm transition-colors ${survey.accent} ${survey.hover}`}
              >
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-gray-900">{survey.title}</p>
                  <p className="text-xs text-gray-500">{survey.subtitle}</p>
                  <p className="mt-1 text-sm text-gray-600">
                    {survey.description}
                  </p>
                </div>
                <ChevronRight
                  className="h-5 w-5 shrink-0 text-gray-400 transition-transform group-hover:translate-x-0.5 group-hover:text-gray-600"
                  aria-hidden
                />
              </Link>
            </li>
          ))}
        </ul>
      </main>

      <footer className="border-t border-gray-200 bg-white px-4 py-4 text-center text-xs text-gray-500">
        Kỹ Năng Mục Vụ · Khảo sát trực tuyến
      </footer>
    </div>
  )
}
