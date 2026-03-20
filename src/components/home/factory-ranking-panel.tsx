import { DashboardSectionCard } from "@/components/home/dashboard-section-card"
import { FACTORY_RANKING_META, HOMEPAGE_COPY } from "@/lib/homepage/constants"
import type { FactoryRankingItem } from "@/lib/homepage/types"
import { cn } from "@/lib/utils"

export interface FactoryRankingPanelProps {
  data: FactoryRankingItem[]
}

export function FactoryRankingPanel({ data }: FactoryRankingPanelProps) {
  const sortedData = [...data].sort((a, b) => b.rankValue - a.rankValue)
  const maxValue = Math.max(...sortedData.map((item) => item.rankValue))

  return (
    <DashboardSectionCard
      title={HOMEPAGE_COPY.sections.factoryRanking}
      description={`右上区按${FACTORY_RANKING_META.metricLabel}展示工厂差异，先用横向比例条表达排行。`}
      contentClassName="space-y-3"
    >
      <div className="flex items-center justify-between rounded-xl border border-border/50 bg-background/20 px-3 py-2 text-xs text-muted-foreground">
        <span>按{FACTORY_RANKING_META.metricLabel}由高到低</span>
        <span className="font-medium text-foreground/90">
          单位 {FACTORY_RANKING_META.unit}
        </span>
      </div>

      <div className="space-y-3">
        {sortedData.map((item) => {
          const width = `${Math.max((item.rankValue / maxValue) * 100, 12)}%`

          return (
            <article
              key={item.factoryName}
              className="rounded-xl border border-border/50 bg-background/20 p-3"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2">
                  <span className="inline-flex size-6 items-center justify-center rounded-full border border-border/60 bg-background/40 text-xs font-medium text-foreground/90">
                    {item.rank}
                  </span>
                  <span className="text-sm font-medium text-foreground/92">
                    {item.factoryName}
                  </span>
                </div>
                <span className="text-sm font-medium text-foreground">
                  {formatNumber(item.rankValue)}
                </span>
              </div>

              <div className="mt-3 h-2 overflow-hidden rounded-full bg-background/40">
                <div
                  className={cn(
                    "h-full rounded-full bg-gradient-to-r from-cyan-300 via-sky-300 to-emerald-300"
                  )}
                  style={{ width }}
                />
              </div>
            </article>
          )
        })}
      </div>
    </DashboardSectionCard>
  )
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("zh-CN", {
    maximumFractionDigits: 0,
  }).format(value)
}
