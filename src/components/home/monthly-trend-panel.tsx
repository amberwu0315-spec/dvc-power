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
      description="近 12 个月总碳排变化"
      headerAside={
        <span className="inline-flex items-center rounded-full border border-border/60 bg-background/24 px-2 py-0.5 text-[0.64rem] leading-4 text-muted-foreground">
          12 个月
        </span>
      }
      descriptionClassName="text-[0.68rem] leading-4"
      contentClassName="flex min-h-0 flex-col gap-2.5 px-3 py-2.5"
    >
      <div className="grid gap-1.5 rounded-lg border border-border/50 bg-background/18 px-3 py-2 sm:grid-cols-3">
        <TrendSummaryItem label="统计月份" value={latest?.month ?? "--"} />
        <TrendSummaryItem
          label="本月总碳排"
          value={formatNumber(latest?.carbon)}
          suffix="tCO2e"
        />
        <TrendSummaryItem
          label="环比变化"
          value={formatSignedNumber(delta)}
          accent={delta <= 0 ? "cool" : "warm"}
        />
      </div>

      <div className="flex min-h-0 flex-1 flex-col rounded-lg border border-border/50 bg-background/20 px-3 py-2.5">
        <div className="mb-1.5 flex items-center justify-between gap-3 text-[0.64rem] leading-4 text-muted-foreground">
          <span>柱高映射月度总碳排</span>
          <span>单位：tCO2e</span>
        </div>

        <div className="grid min-h-[12rem] flex-1 grid-cols-12 items-end gap-1.5">
          {data.map((item, index) => {
            const height = `${Math.max((item.carbon / carbonMax) * 100, 18)}%`

            return (
              <div
                key={item.month}
                className="flex h-full flex-col justify-end gap-1.5"
              >
                <div
                  className={cn(
                    "rounded-t-md border border-white/10 shadow-[0_0_18px_rgba(56,189,248,0.12)]",
                    barToneClasses[index % barToneClasses.length]
                  )}
                  style={{ height }}
                  title={`${item.month} 碳排 ${item.carbon}`}
                />
                <div className="text-center text-[0.62rem] text-muted-foreground">
                  {item.month.slice(5)}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </DashboardSectionCard>
  )
}

interface TrendSummaryItemProps {
  label: string
  value: string
  suffix?: string
  accent?: "default" | "cool" | "warm"
}

function TrendSummaryItem({
  label,
  value,
  suffix,
  accent = "default",
}: TrendSummaryItemProps) {
  return (
    <div
      className={cn(
        "min-w-0 rounded-lg px-0.5 py-0.5",
        accent === "cool" && "text-sky-100",
        accent === "warm" && "text-amber-100"
      )}
    >
      <div className="text-[0.64rem] tracking-[0.12em] text-muted-foreground uppercase">
        {label}
      </div>
      <div className="mt-0.5 flex min-w-0 items-end gap-1.5">
        <div className="truncate text-base font-semibold tracking-tight text-foreground">
          {value}
        </div>
        {suffix ? (
          <div className="pb-0.5 text-[0.64rem] text-muted-foreground">
            {suffix}
          </div>
        ) : null}
      </div>
    </div>
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
