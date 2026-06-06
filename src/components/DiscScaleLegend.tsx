import { SurveyScaleLegend } from '@/components/SurveyScaleLegend'
import { DISC_SCALE_LABELS } from '@/constant'

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
