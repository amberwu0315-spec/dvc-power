import { DashboardSectionCard } from "@/components/home/dashboard-section-card"
import { HOMEPAGE_COPY } from "@/features/templates/manufacturing-carbon-overview/constants"
import type { GoalProgress } from "@/features/templates/manufacturing-carbon-overview/types"

export interface GoalProgressPanelProps {
  data: GoalProgress
}

export function GoalProgressPanel({ data }: GoalProgressPanelProps) {
  const progressWidth = `${Math.min(Math.max(data.completionRate, 0), 100)}%`

  return (
    <DashboardSectionCard
      title={HOMEPAGE_COPY.sections.goalProgress}
      description="目标值 / 当前值 / 差值"
      headerAside={
        <span className="inline-flex items-center rounded-full border border-border/60 bg-background/24 px-2 py-0.5 text-[0.64rem] leading-4 text-foreground/88">
          {data.completionRate.toFixed(1)}%
        </span>
      }
      descriptionClassName="text-[0.68rem] leading-4"
      contentClassName="space-y-3"
    >
      <div className="rounded-lg border border-border/50 bg-background/20 px-3 py-2.5">
        <div className="text-[0.64rem] tracking-[0.12em] text-muted-foreground uppercase">
          年度完成率
        </div>
        <div className="mt-1.5 text-2xl leading-none font-semibold tracking-tight text-foreground">
          {data.completionRate.toFixed(1)}%
        </div>
        <div className="mt-1 text-[0.78rem] text-muted-foreground">
          距当前年度目标仍差 {formatNumber(data.gapValue)} tCO2e
        </div>

        <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-background/40">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-sky-300 to-emerald-300"
            style={{ width: progressWidth }}
          />
        </div>
      </div>

      <div className="grid gap-2 sm:grid-cols-3">
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
      ? value.toFixed(1)
      : new Intl.NumberFormat("zh-CN", {
          maximumFractionDigits: 0,
        }).format(value)

  return (
    <div className="rounded-lg border border-border/50 bg-background/20 px-3 py-2">
      <div className="text-[0.64rem] tracking-[0.12em] text-muted-foreground uppercase">
        {label}
      </div>
      <div className="mt-1.5 flex flex-wrap items-end gap-1.5">
        <div className="text-base font-semibold tracking-tight text-foreground">
          {displayValue}
        </div>
        <div className="pb-0.5 text-[0.62rem] text-muted-foreground">
          {unit}
        </div>
      </div>
    </div>
  )
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("zh-CN", {
    maximumFractionDigits: 0,
  }).format(value)
}
