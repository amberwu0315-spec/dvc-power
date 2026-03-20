import { DashboardSectionCard } from "@/components/home/dashboard-section-card"
import { HOMEPAGE_COPY } from "@/lib/homepage/constants"
import type { EmissionStructureItem } from "@/lib/homepage/types"
import { cn } from "@/lib/utils"

export interface EmissionStructurePanelProps {
  data: EmissionStructureItem[]
}

const segmentClasses = [
  "bg-cyan-300",
  "bg-sky-300",
  "bg-emerald-300",
  "bg-violet-300",
  "bg-amber-300",
  "bg-rose-300",
] as const

export function EmissionStructurePanel({ data }: EmissionStructurePanelProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0)

  return (
    <DashboardSectionCard
      title={HOMEPAGE_COPY.sections.emissionStructure}
      description="左下区展示排放来源构成，先用比例带和分类清单表达结构关系。"
      contentClassName="space-y-4"
    >
      <div className="rounded-xl border border-border/50 bg-background/20 p-4">
        <div className="text-[0.72rem] tracking-[0.12em] text-muted-foreground uppercase">
          排放构成总览
        </div>
        <div className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
          {new Intl.NumberFormat("zh-CN", {
            maximumFractionDigits: 0,
          }).format(total)}
          <span className="ml-2 text-sm font-normal text-muted-foreground">
            tCO2e
          </span>
        </div>

        <div className="mt-4 flex h-4 overflow-hidden rounded-full border border-white/10 bg-background/30">
          {data.map((item, index) => (
            <div
              key={item.category}
              className={cn(segmentClasses[index % segmentClasses.length])}
              style={{ width: `${item.percent}%` }}
              title={`${item.category} ${item.percent}%`}
            />
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {data.map((item, index) => (
          <div
            key={item.category}
            className="rounded-xl border border-border/50 bg-background/20 p-3"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2">
                <span
                  className={cn(
                    "size-2.5 rounded-full",
                    segmentClasses[index % segmentClasses.length]
                  )}
                />
                <span className="text-sm font-medium text-foreground/92">
                  {item.category}
                </span>
              </div>
              <span className="text-sm font-medium text-foreground">
                {item.percent.toFixed(1)}%
              </span>
            </div>

            <div className="mt-3 h-2 overflow-hidden rounded-full bg-background/40">
              <div
                className={cn(
                  "h-full rounded-full",
                  segmentClasses[index % segmentClasses.length]
                )}
                style={{ width: `${item.percent}%` }}
              />
            </div>

            <div className="mt-2 text-xs text-muted-foreground">
              排放量 {new Intl.NumberFormat("zh-CN").format(item.value)} tCO2e
            </div>
          </div>
        ))}
      </div>
    </DashboardSectionCard>
  )
}
