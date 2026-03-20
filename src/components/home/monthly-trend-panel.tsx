import { DashboardSectionCard } from "@/components/home/dashboard-section-card"
import { HOMEPAGE_COPY } from "@/lib/homepage/constants"
import type { MonthlyTrendPoint } from "@/lib/homepage/types"
import { cn } from "@/lib/utils"

export interface MonthlyTrendPanelProps {
  data: MonthlyTrendPoint[]
}

const barToneClasses = [
  "bg-sky-300/75",
  "bg-cyan-300/75",
  "bg-sky-200/75",
  "bg-cyan-200/75",
] as const

export function MonthlyTrendPanel({ data }: MonthlyTrendPanelProps) {
  const carbonMax = Math.max(...data.map((item) => item.carbon))
  const latest = data.at(-1)
  const previous = data.at(-2)
  const delta = latest && previous ? latest.carbon - previous.carbon : 0

  return (
    <DashboardSectionCard
      title={HOMEPAGE_COPY.sections.monthlyTrend}
      description="左上区聚焦近 12 个月总碳排变化，用基础柱形表达波动与峰值。"
      contentClassName="space-y-4"
    >
      <div className="grid gap-3 sm:grid-cols-3">
        <TrendSummaryCard
          label="统计月份"
          value={latest?.month ?? "--"}
          helper="当前趋势落点"
        />
        <TrendSummaryCard
          label="本月总碳排"
          value={formatNumber(latest?.carbon)}
          helper="单位：tCO2e"
        />
        <TrendSummaryCard
          label="环比变化"
          value={formatSignedNumber(delta)}
          helper="与上月总碳排相比"
          accent={delta <= 0 ? "cool" : "warm"}
        />
      </div>

      <div className="grid h-48 grid-cols-12 items-end gap-2 rounded-xl border border-border/50 bg-background/20 px-3 py-4">
        {data.map((item, index) => {
          const height = `${Math.max((item.carbon / carbonMax) * 100, 18)}%`

          return (
            <div key={item.month} className="flex h-full flex-col justify-end gap-2">
              <div
                className={cn(
                  "rounded-t-md border border-white/10",
                  barToneClasses[index % barToneClasses.length]
                )}
                style={{ height }}
                title={`${item.month} 碳排 ${item.carbon}`}
              />
              <div className="text-center text-[0.65rem] text-muted-foreground">
                {item.month.slice(5)}
              </div>
            </div>
          )
        })}
      </div>

      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
        <LegendDot className="bg-sky-300" label="柱高映射月度总碳排" />
        <span>用于快速识别月度峰值、低谷和相邻月份变化幅度。</span>
      </div>
    </DashboardSectionCard>
  )
}

interface TrendSummaryCardProps {
  label: string
  value: string
  helper: string
  accent?: "default" | "cool" | "warm"
}

function TrendSummaryCard({
  label,
  value,
  helper,
  accent = "default",
}: TrendSummaryCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border/50 bg-background/20 px-4 py-3",
        accent === "cool" && "border-sky-400/20 bg-sky-500/8",
        accent === "warm" && "border-amber-400/20 bg-amber-500/8"
      )}
    >
      <div className="text-[0.7rem] tracking-[0.12em] text-muted-foreground uppercase">
        {label}
      </div>
      <div className="mt-2 text-lg font-semibold tracking-tight text-foreground">
        {value}
      </div>
      <div className="mt-1 text-xs text-muted-foreground">{helper}</div>
    </div>
  )
}

function LegendDot({
  className,
  label,
}: {
  className: string
  label: string
}) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className={cn("size-2 rounded-full", className)} />
      <span>{label}</span>
    </span>
  )
}

function formatNumber(value?: number) {
  if (value === undefined) {
    return "--"
  }

  return new Intl.NumberFormat("zh-CN", {
    maximumFractionDigits: 0,
  }).format(value)
}

function formatSignedNumber(value: number) {
  return `${value > 0 ? "+" : ""}${new Intl.NumberFormat("zh-CN", {
    maximumFractionDigits: 0,
  }).format(value)}`
}
