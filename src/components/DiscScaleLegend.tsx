import { DISC_SCALE_LABELS } from '@/constant'
import { SurveyScaleLegend } from '@/components/SurveyScaleLegend'

type DiscScaleLegendProps = {
  className?: string
}

export function DiscScaleLegend({ className = '' }: DiscScaleLegendProps) {
  return (
    <SurveyScaleLegend
      className={className}
      tone="green"
      title="Thang điểm (1 → 5)"
      labels={DISC_SCALE_LABELS}
    />
  )
}
