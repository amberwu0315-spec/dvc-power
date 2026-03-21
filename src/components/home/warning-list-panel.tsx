import { Badge } from "@/components/ui/badge"
import { DashboardSectionCard } from "@/components/home/dashboard-section-card"
import {
  HOMEPAGE_COPY,
  WARNING_LEVEL_META,
} from "@/features/templates/manufacturing-carbon-overview/constants"
import type { WarningItem } from "@/features/templates/manufacturing-carbon-overview/types"
import { cn } from "@/lib/utils"

export interface WarningListPanelProps {
  items: WarningItem[]
}

const levelToneClassName = {
  danger:
    "border-rose-400/30 bg-rose-500/12 text-rose-200 hover:bg-rose-500/18",
  warning:
    "border-amber-400/30 bg-amber-500/12 text-amber-200 hover:bg-amber-500/18",
  neutral:
    "border-slate-300/20 bg-slate-300/10 text-slate-100 hover:bg-slate-300/16",
} as const

export function WarningListPanel({ items }: WarningListPanelProps) {
  const topItems = items.slice(0, 3)
  const moreCount = Math.max(items.length - topItems.length, 0)

  return (
    <DashboardSectionCard
      title={HOMEPAGE_COPY.sections.warnings}
      description="Top 3 异常摘要"
      variant="list"
      headerAside={
        <div className="inline-flex items-center rounded-full border border-border/60 bg-background/24 px-2 py-0.5 text-[0.64rem] leading-4 text-muted-foreground">
          Top {topItems.length}
        </div>
      }
      descriptionClassName="text-[0.68rem] leading-4"
      contentClassName="flex min-h-0 flex-col gap-2"
    >
      <div className="space-y-1.5">
        {topItems.map((item, index) => {
          const meta = WARNING_LEVEL_META[item.level]

          return (
            <article
              key={item.id}
              className={cn(
                "rounded-lg border px-2.5 py-2",
                index === 0
                  ? "border-rose-400/16 bg-rose-500/8"
                  : "border-white/8 bg-background/14"
              )}
            >
              <div className="flex items-start gap-2.5">
                <Badge
                  variant="outline"
                  className={cn(
                    "mt-0.5 border px-1.5 py-0 text-[0.6rem]",
                    levelToneClassName[meta.tone]
                  )}
                >
                  {meta.label}
                </Badge>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-[0.82rem] font-medium text-foreground/92">
                      {item.factoryName}
                    </span>
                    <span className="truncate text-[0.68rem] text-muted-foreground">
                      {item.warningType}
                    </span>
                    <span className="ml-auto shrink-0 text-[0.64rem] text-muted-foreground">
                      {item.time}
                    </span>
                  </div>

                  <p className="mt-1 text-[0.78rem] leading-[1.35] text-foreground/88">
                    {item.message}
                  </p>
                </div>
              </div>
            </article>
          )
        })}
      </div>

      {moreCount > 0 ? (
        <div className="rounded-lg border border-dashed border-border/50 bg-background/14 px-2.5 py-1.5 text-[0.68rem] leading-4 text-muted-foreground">
          其他 {moreCount} 条预警收起展示
        </div>
      ) : null}
    </DashboardSectionCard>
  )
}
