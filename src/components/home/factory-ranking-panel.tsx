import { DashboardSectionCard } from "@/components/home/dashboard-section-card"
import { FACTORY_RANKING_META, HOMEPAGE_COPY } from "@/lib/homepage/constants"
import type { FactoryRankingItem } from "@/lib/homepage/types"
import { cn } from "@/lib/utils"

export interface FactoryRankingPanelProps {
  data: FactoryRankingItem[]
}

export function FactoryRankingPanel({ data }: FactoryRankingPanelProps) {
  const sortedData = [...data].sort((a, b) => b.rankValue - a.rankValue)
  const topItems = sortedData.slice(0, 5)
  const moreCount = Math.max(sortedData.length - topItems.length, 0)
  const maxValue = Math.max(...topItems.map((item) => item.rankValue), 1)

  return (
    <DashboardSectionCard
      title={HOMEPAGE_COPY.sections.factoryRanking}
      description={`按${FACTORY_RANKING_META.metricLabel}排序`}
      variant="list"
      headerAside={
        <div className="inline-flex items-center rounded-full border border-border/60 bg-background/24 px-2 py-0.5 text-[0.64rem] leading-4 text-muted-foreground">
          Top {topItems.length}
        </div>
      }
      descriptionClassName="text-[0.68rem] leading-4"
      contentClassName="flex min-h-0 flex-col gap-2"
    >
      <div className="flex items-center justify-between rounded-md border border-border/50 bg-background/20 px-2.5 py-1.5 text-[0.68rem] leading-4 text-muted-foreground">
        <span>按{FACTORY_RANKING_META.metricLabel}由高到低</span>
        <span className="font-medium text-foreground/90">
          单位 {FACTORY_RANKING_META.unit}
        </span>
      </div>

      <div className="space-y-1.5">
        {topItems.map((item) => {
          const width = `${Math.max((item.rankValue / maxValue) * 100, 16)}%`

          return (
            <article
              key={item.factoryName}
              className="rounded-lg border border-white/8 bg-background/14 px-2.5 py-2"
            >
              <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-2.5">
                <span className="inline-flex size-5 items-center justify-center rounded-full border border-border/60 bg-background/36 text-[0.64rem] font-medium text-foreground/90">
                  {item.rank}
                </span>

                <div className="min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-[0.82rem] font-medium text-foreground/92">
                      {item.factoryName}
                    </span>
                    <span className="shrink-0 text-[0.68rem] text-muted-foreground">
                      {formatNumber(item.rankValue)}
                    </span>
                  </div>

                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-background/40">
                    <div
                      className={cn(
                        "h-full rounded-full bg-gradient-to-r from-cyan-300 via-sky-300 to-emerald-300"
                      )}
                      style={{ width }}
                    />
                  </div>
                </div>
              </div>
            </article>
          )
        })}
      </div>

      {moreCount > 0 ? (
        <div className="rounded-lg border border-dashed border-border/50 bg-background/14 px-2.5 py-1.5 text-[0.68rem] leading-4 text-muted-foreground">
          其他 {moreCount} 家工厂收起展示
        </div>
      ) : null}
    </DashboardSectionCard>
  )
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("zh-CN", {
    maximumFractionDigits: 0,
  }).format(value)
}
