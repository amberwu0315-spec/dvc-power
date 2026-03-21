import type { ReactNode } from "react"

import { DashboardSectionCard } from "@/components/home/dashboard-section-card"
import { FACTORY_RANKING_META, HOMEPAGE_COPY } from "@/lib/homepage/constants"
import type { FactoryRankingItem } from "@/lib/homepage/types"
import { cn } from "@/lib/utils"

export interface RankingListItem {
  name: string
  value: number
  rank?: number
}

export interface FactoryRankingPanelProps {
  data: Array<FactoryRankingItem | RankingListItem>
  title?: string
  description?: string
  metricLabel?: string
  unit?: string
  headerAside?: ReactNode
  summary?: {
    label: string
    value: string
  } | null
  tone?: "dark" | "light"
  valueFormatter?: (value: number) => string
  className?: string
  contentClassName?: string
  barGradient?: string
  showCollapsedSummary?: boolean
  showSummary?: boolean
  listStyle?: "card" | "plain"
  showRankBadge?: boolean
}

const toneClassMap = {
  dark: {
    card: undefined,
    summary: "border-border/50 bg-background/20 text-muted-foreground",
    summaryValue: "text-foreground/90",
    item: "border-white/8 bg-background/14",
    rankBadge: "border-border/60 bg-background/36 text-foreground/90",
    itemLabel: "text-foreground/92",
    itemValue: "text-muted-foreground",
    collapsed:
      "border-dashed border-border/50 bg-background/14 text-muted-foreground",
    defaultBarGradient:
      "linear-gradient(90deg, #67e8f9 0%, #7dd3fc 55%, #6ee7b7 100%)",
  },
  light: {
    card: undefined,
    summary: "border-white/28 bg-white/18 text-slate-500/88",
    summaryValue: "text-slate-800",
    item: "border-white/18 bg-white/16",
    rankBadge: "border-white/42 bg-white/22 text-slate-600",
    itemLabel: "text-slate-800",
    itemValue: "text-slate-500/88",
    collapsed: "border-dashed border-white/24 bg-white/18 text-slate-500/88",
    defaultBarGradient: "linear-gradient(90deg, #14b8a6 0%, #2dd4bf 52%, #7dd3fc 100%)",
  },
} as const

export function FactoryRankingPanel({
  data,
  title = HOMEPAGE_COPY.sections.factoryRanking,
  description = `按${FACTORY_RANKING_META.metricLabel}排序`,
  metricLabel = FACTORY_RANKING_META.metricLabel,
  unit = FACTORY_RANKING_META.unit,
  headerAside,
  summary,
  tone = "dark",
  valueFormatter = formatNumber,
  className,
  contentClassName,
  barGradient,
  showCollapsedSummary = true,
  showSummary = true,
  listStyle = "card",
  showRankBadge = true,
}: FactoryRankingPanelProps) {
  const resolvedSummary =
    summary === undefined
      ? {
          label: `按${metricLabel}由高到低`,
          value: `单位 ${unit}`,
        }
      : summary
  const normalizedData = data.map((item) =>
    "factoryName" in item
      ? {
          name: item.factoryName,
          value: item.rankValue,
          rank: item.rank,
        }
      : item
  )

  const sortedData = [...normalizedData].sort((a, b) => b.value - a.value)
  const topItems = sortedData.slice(0, 5)
  const moreCount = Math.max(sortedData.length - topItems.length, 0)
  const maxValue = Math.max(...topItems.map((item) => item.value), 1)
  const toneClasses = toneClassMap[tone]
  const isPlainList = listStyle === "plain"

  return (
    <DashboardSectionCard
      title={title}
      description={description}
      cardUnstyled={tone === "light"}
      variant="list"
      headerAside={
        headerAside ?? (
          <div className="inline-flex items-center rounded-full border border-border/60 bg-background/24 px-2 py-0.5 text-[0.64rem] leading-4 text-muted-foreground">
            Top {topItems.length}
          </div>
        )
      }
      descriptionClassName="text-[0.68rem] leading-4"
      className={cn(toneClasses.card, className)}
      contentClassName={cn("flex min-h-0 flex-col gap-1.5", contentClassName)}
    >
      {showSummary && resolvedSummary ? (
        <div
          className={cn(
            "flex items-center justify-between rounded-md border px-2.5 py-1.5 text-[0.68rem] leading-4",
            toneClasses.summary
          )}
        >
          <span>{resolvedSummary.label}</span>
          <span className={cn("font-medium", toneClasses.summaryValue)}>
            {resolvedSummary.value}
          </span>
        </div>
      ) : null}

      <div className={cn(isPlainList ? "space-y-4" : "space-y-1.5")}>
        {topItems.map((item, index) => {
          const width = `${Math.max((item.value / maxValue) * 100, 16)}%`

          return (
            <article
              key={item.name}
              className={cn(
                isPlainList
                  ? "border-0 bg-transparent px-0 py-0"
                  : "rounded-lg border px-2.5 py-2",
                !isPlainList && toneClasses.item
              )}
            >
              <div
                className={cn(
                  "grid items-center gap-2.5",
                  showRankBadge
                    ? "grid-cols-[auto_minmax(0,1fr)]"
                    : "grid-cols-[minmax(0,1fr)]"
                )}
              >
                {showRankBadge ? (
                  <span
                    className={cn(
                      "inline-flex size-5 items-center justify-center rounded-full border text-[0.64rem] font-medium",
                      toneClasses.rankBadge
                    )}
                  >
                    {item.rank ?? index + 1}
                  </span>
                ) : null}

                <div className="min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={cn(
                        isPlainList
                          ? "truncate text-[1rem] font-medium"
                          : "truncate text-[0.82rem] font-medium",
                        toneClasses.itemLabel
                      )}
                    >
                      {item.name}
                    </span>
                    <span
                      className={cn(
                        isPlainList
                          ? "shrink-0 text-[0.96rem] font-medium"
                          : "shrink-0 text-[0.68rem]",
                        toneClasses.itemValue
                      )}
                    >
                      {valueFormatter(item.value)}
                    </span>
                  </div>

                  <div
                    className={cn(
                      isPlainList
                        ? "mt-2 h-1.5 overflow-hidden rounded-full"
                        : "mt-1.5 h-1.5 overflow-hidden rounded-full",
                      tone === "light"
                        ? isPlainList
                          ? "bg-slate-300/72"
                          : "bg-slate-200/70"
                        : "bg-background/40"
                    )}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width,
                        background:
                          barGradient ?? toneClasses.defaultBarGradient,
                      }}
                    />
                  </div>
                </div>
              </div>
            </article>
          )
        })}
      </div>

      {showCollapsedSummary && moreCount > 0 ? (
        <div
          className={cn(
            "rounded-lg border px-2.5 py-1.5 text-[0.68rem] leading-4",
            toneClasses.collapsed
          )}
        >
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
