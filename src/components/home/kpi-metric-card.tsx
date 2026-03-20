import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { KpiMetric, TrendDirection } from "@/lib/homepage/types"

export interface KpiMetricCardProps {
  metric: KpiMetric
}

const trendMeta: Record<
  TrendDirection,
  {
    label: string
    badgeClassName: string
    accentClassName: string
  }
> = {
  up: {
    label: "上升",
    badgeClassName:
      "border-emerald-400/30 bg-emerald-500/12 text-emerald-200 hover:bg-emerald-500/18",
    accentClassName: "bg-emerald-300",
  },
  down: {
    label: "下降",
    badgeClassName:
      "border-sky-400/30 bg-sky-500/12 text-sky-200 hover:bg-sky-500/18",
    accentClassName: "bg-sky-300",
  },
  flat: {
    label: "持平",
    badgeClassName:
      "border-slate-300/20 bg-slate-300/10 text-slate-100 hover:bg-slate-300/16",
    accentClassName: "bg-slate-300",
  },
}

export function KpiMetricCard({ metric }: KpiMetricCardProps) {
  const trend = trendMeta[metric.trend]

  return (
    <article className="relative overflow-hidden rounded-xl border border-border/60 bg-background/30 p-4">
      <div
        className={cn(
          "absolute inset-x-0 top-0 h-0.5 opacity-90",
          trend.accentClassName
        )}
      />

      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[0.72rem] font-medium tracking-[0.12em] text-muted-foreground uppercase">
            {metric.label}
          </div>
          <div className="mt-3 flex items-end gap-2">
            <span className="text-2xl font-semibold tracking-tight text-foreground">
              {formatValue(metric.value)}
            </span>
            <span className="pb-0.5 text-xs text-muted-foreground">
              {metric.unit}
            </span>
          </div>
        </div>

        <Badge
          variant="outline"
          className={cn("border px-2.5 py-1 text-[0.65rem]", trend.badgeClassName)}
        >
          {trend.label}
        </Badge>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <MetricMeta label="同比" value={metric.yoy} />
        <MetricMeta label="较上月" value={metric.mom} />
      </div>
    </article>
  )
}

interface MetricMetaProps {
  label: string
  value: number
}

function MetricMeta({ label, value }: MetricMetaProps) {
  const isPositive = value > 0
  const isNegative = value < 0

  return (
    <div className="rounded-lg border border-border/50 bg-background/20 px-3 py-2">
      <div className="text-[0.7rem] tracking-[0.12em] text-muted-foreground uppercase">
        {label}
      </div>
      <div
        className={cn(
          "mt-1 text-sm font-medium",
          isPositive && "text-emerald-200",
          isNegative && "text-sky-200",
          !isPositive && !isNegative && "text-foreground/90"
        )}
      >
        {formatSignedPercent(value)}
      </div>
    </div>
  )
}

function formatValue(value: number) {
  return new Intl.NumberFormat("zh-CN", {
    maximumFractionDigits: value >= 100 ? 0 : 2,
  }).format(value)
}

function formatSignedPercent(value: number) {
  const sign = value > 0 ? "+" : ""

  return `${sign}${value.toFixed(1)}%`
}
