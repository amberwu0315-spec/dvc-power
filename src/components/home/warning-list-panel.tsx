import { Badge } from "@/components/ui/badge"
import { DashboardSectionCard } from "@/components/home/dashboard-section-card"
import { HOMEPAGE_COPY, WARNING_LEVEL_META } from "@/lib/homepage/constants"
import type { WarningItem } from "@/lib/homepage/types"
import { cn } from "@/lib/utils"

export interface WarningListPanelProps {
  items: WarningItem[]
}

const levelToneClassName = {
  danger: "border-rose-400/30 bg-rose-500/12 text-rose-200 hover:bg-rose-500/18",
  warning:
    "border-amber-400/30 bg-amber-500/12 text-amber-200 hover:bg-amber-500/18",
  neutral:
    "border-slate-300/20 bg-slate-300/10 text-slate-100 hover:bg-slate-300/16",
} as const

export function WarningListPanel({ items }: WarningListPanelProps) {
  return (
    <DashboardSectionCard
      title={HOMEPAGE_COPY.sections.warnings}
      description="右下区优先呈现预警等级、工厂、异常摘要与时间信息。"
      contentClassName="space-y-3"
    >
      {items.map((item) => {
        const meta = WARNING_LEVEL_META[item.level]

        return (
          <article
            key={item.id}
            className="rounded-xl border border-border/50 bg-background/20 p-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={cn(
                      "border px-2.5 py-1 text-[0.65rem]",
                      levelToneClassName[meta.tone]
                    )}
                  >
                    {meta.label}
                  </Badge>
                  <span className="text-sm font-medium text-foreground/92">
                    {item.factoryName}
                  </span>
                </div>

                <p className="text-sm/6 text-foreground/88">{item.message}</p>
              </div>

              <span className="shrink-0 text-xs text-muted-foreground">
                {item.time}
              </span>
            </div>
          </article>
        )
      })}
    </DashboardSectionCard>
  )
}
