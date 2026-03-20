import { Badge } from "@/components/ui/badge"
import { DashboardSectionCard } from "@/components/home/dashboard-section-card"
import { HOMEPAGE_COPY } from "@/lib/homepage/constants"
import type { KpiMetric, TrendDirection } from "@/lib/homepage/types"
import { cn } from "@/lib/utils"

export interface KpiOverviewPanelProps {
  metrics: KpiMetric[]
}

const metricPriority: KpiMetric["key"][] = [
  "totalCarbon",
  "totalEnergy",
  "carbonPerOutput",
  "greenPowerRatio",
]

const trendMeta: Record<
  TrendDirection,
  {
    label: string
    badgeClassName: string
    accentClassName: string
    panelClassName: string
  }
> = {
  up: {
    label: "上升",
    badgeClassName:
      "border-cyan-400/24 bg-cyan-400/10 text-cyan-100 hover:bg-cyan-400/14",
    accentClassName: "from-cyan-300/28 via-sky-300/12 to-transparent",
    panelClassName: "border-cyan-400/24",
  },
  down: {
    label: "下降",
    badgeClassName:
      "border-emerald-400/24 bg-emerald-400/10 text-emerald-100 hover:bg-emerald-400/14",
    accentClassName: "from-emerald-300/22 via-sky-300/12 to-transparent",
    panelClassName: "border-emerald-400/24",
  },
  flat: {
    label: "持平",
    badgeClassName:
      "border-indigo-300/24 bg-indigo-300/10 text-indigo-100 hover:bg-indigo-300/14",
    accentClassName: "from-indigo-300/22 via-sky-300/12 to-transparent",
    panelClassName: "border-indigo-300/24",
  },
}

export function KpiOverviewPanel({ metrics }: KpiOverviewPanelProps) {
  const sortedMetrics = [...metrics].sort(
    (left, right) =>
      metricPriority.indexOf(left.key) - metricPriority.indexOf(right.key)
  )
  const primaryMetric = sortedMetrics[0]
  const secondaryMetrics = sortedMetrics.slice(1)

  if (!primaryMetric) {
    return null
  }

  return (
    <DashboardSectionCard
      title={HOMEPAGE_COPY.sections.kpiOverview}
      description="中心主判断 + 3 项辅助指标"
      variant="judgment"
      className="min-h-0 border-cyan-400/12 shadow-cyan-950/20"
      headerAside={
        <div className="inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/8 px-2 py-0.5 text-[0.64rem] leading-4 text-cyan-50/90">
          4 项指标
        </div>
      }
      descriptionClassName="text-[0.68rem] leading-4"
      contentClassName="flex min-h-0 flex-col gap-2.5"
    >
      <PrimaryMetricPanel metric={primaryMetric} />

      <div className="grid gap-2.5 md:grid-cols-3">
        {secondaryMetrics.map((metric) => (
          <SecondaryMetricCard key={metric.key} metric={metric} />
        ))}
      </div>
    </DashboardSectionCard>
  )
}

function PrimaryMetricPanel({ metric }: { metric: KpiMetric }) {
  const trend = trendMeta[metric.trend]

  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-xl border bg-gradient-to-br px-4 py-4",
        "from-background/56 via-background/22 to-background/16",
        trend.panelClassName
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-100",
          trend.accentClassName
        )}
      />

      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-[0.66rem] font-medium tracking-[0.14em] text-cyan-100/78 uppercase">
              中心主判断
            </div>
            <div className="mt-1.5 text-[0.84rem] font-medium text-foreground/92">
              {metric.label}
            </div>
          </div>

          <Badge
            variant="outline"
            className={cn(
              "border px-2 py-0.5 text-[0.62rem]",
              trend.badgeClassName
            )}
          >
            {trend.label}
          </Badge>
        </div>

        <div className="mt-4 flex flex-wrap items-end gap-2.5">
          <div className="text-[2.4rem] leading-none font-semibold tracking-tight text-foreground">
            {formatValue(metric.value)}
          </div>
          <div className="pb-0.5 text-[0.82rem] text-muted-foreground">
            {metric.unit}
          </div>
        </div>

        <div className="mt-3.5 grid gap-2 sm:grid-cols-2">
          <MetricDeltaPanel label="同比" value={metric.yoy} />
          <MetricDeltaPanel label="较上月" value={metric.mom} />
        </div>
      </div>
    </article>
  )
}

function SecondaryMetricCard({ metric }: { metric: KpiMetric }) {
  const trend = trendMeta[metric.trend]

  return (
    <article className="rounded-lg border border-border/50 bg-background/20 px-3 py-2.5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[0.64rem] tracking-[0.12em] text-muted-foreground uppercase">
            {metric.label}
          </div>
          <div className="mt-1.5 flex min-w-0 items-end gap-1.5">
            <div className="truncate text-lg font-semibold tracking-tight text-foreground">
              {formatValue(metric.value)}
            </div>
            <div className="pb-0.5 text-[0.64rem] text-muted-foreground">
              {metric.unit}
            </div>
          </div>
        </div>

        <Badge
          variant="outline"
          className={cn(
            "shrink-0 border px-1.5 py-0 text-[0.6rem]",
            trend.badgeClassName
          )}
        >
          {trend.label}
        </Badge>
      </div>

      <div className="mt-2.5 grid grid-cols-2 gap-1.5 text-[0.64rem] text-muted-foreground">
        <CompactMetricDelta label="同比" value={metric.yoy} />
        <CompactMetricDelta label="较上月" value={metric.mom} />
      </div>
    </article>
  )
}

function MetricDeltaPanel({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-white/8 bg-background/18 px-2.5 py-2">
      <div className="text-[0.64rem] tracking-[0.12em] text-muted-foreground uppercase">
        {label}
      </div>
      <div className="mt-0.5 text-sm font-medium text-foreground/92">
        {formatSignedPercent(value)}
      </div>
    </div>
  )
}

function CompactMetricDelta({
  label,
  value,
}: {
  label: string
  value: number
}) {
  return (
    <div className="rounded-lg border border-white/6 bg-background/12 px-2 py-1.5">
      <div className="text-[0.6rem] tracking-[0.12em] text-muted-foreground uppercase">
        {label}
      </div>
      <div className="mt-0.5 text-[0.82rem] font-medium text-foreground/90">
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
