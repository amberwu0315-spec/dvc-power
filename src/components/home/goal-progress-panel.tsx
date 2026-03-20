import { DashboardSectionCard } from "@/components/home/dashboard-section-card"
import { HOMEPAGE_COPY } from "@/lib/homepage/constants"
import type { GoalProgress } from "@/lib/homepage/types"

export interface GoalProgressPanelProps {
  data: GoalProgress
}

export function GoalProgressPanel({ data }: GoalProgressPanelProps) {
  const progressWidth = `${Math.min(Math.max(data.completionRate, 0), 100)}%`

  return (
    <DashboardSectionCard
      title={HOMEPAGE_COPY.sections.goalProgress}
      description="右中区聚焦年度目标推进情况，优先展示目标值、当前值与距目标差值。"
      contentClassName="space-y-4"
    >
      <div className="rounded-xl border border-border/50 bg-background/20 p-4">
        <div className="text-[0.72rem] tracking-[0.12em] text-muted-foreground uppercase">
          年度完成率
        </div>
        <div className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
          {data.completionRate.toFixed(1)}%
        </div>
        <div className="mt-1 text-sm text-muted-foreground">
          距当前年度目标仍差 {formatNumber(data.gapValue)} tCO2e
        </div>

        <div className="mt-4 h-3 overflow-hidden rounded-full bg-background/40">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-sky-300 to-emerald-300"
            style={{ width: progressWidth }}
          />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <GoalMetricCard label="目标值" value={data.targetValue} unit="tCO2e" />
        <GoalMetricCard label="当前值" value={data.currentValue} unit="tCO2e" />
        <GoalMetricCard label="差值" value={data.gapValue} unit="tCO2e" />
      </div>
    </DashboardSectionCard>
  )
}

interface GoalMetricCardProps {
  label: string
  value: number
  unit: string
}

function GoalMetricCard({ label, value, unit }: GoalMetricCardProps) {
  const displayValue =
    unit === "%"
      ? `${value.toFixed(1)}${unit}`
      : `${new Intl.NumberFormat("zh-CN", {
          maximumFractionDigits: 0,
        }).format(value)} ${unit}`

  return (
    <div className="rounded-xl border border-border/50 bg-background/20 px-4 py-3">
      <div className="text-[0.7rem] tracking-[0.12em] text-muted-foreground uppercase">
        {label}
      </div>
      <div className="mt-2 text-lg font-semibold tracking-tight text-foreground">
        {displayValue}
      </div>
    </div>
  )
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("zh-CN", {
    maximumFractionDigits: 0,
  }).format(value)
}
