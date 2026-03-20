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
      description="4 类排放来源占比"
      headerAside={
        <div className="rounded-full border border-border/60 bg-background/24 px-2.5 py-1 text-[0.68rem] text-foreground/88">
          {new Intl.NumberFormat("zh-CN", {
            maximumFractionDigits: 0,
          }).format(total)}
          <span className="ml-1 text-muted-foreground">tCO2e</span>
        </div>
      }
      headerClassName="pb-2.5"
      descriptionClassName="text-[0.72rem] leading-5"
      contentClassName="flex min-h-0 flex-col gap-3 px-3 py-3"
    >
      <div className="rounded-xl border border-border/50 bg-background/20 px-3 py-3">
        <div className="flex items-center justify-between gap-3 text-[0.68rem] text-muted-foreground">
          <span>排放构成总览</span>
          <span>{data.length} 类来源</span>
        </div>

        <div className="mt-3 flex h-4 overflow-hidden rounded-full border border-white/10 bg-background/30">
          {data.map((item, index) => (
            <div
              key={item.category}
              className={cn(segmentClasses[index % segmentClasses.length])}
              style={{ width: `${item.percent}%` }}
              title={`${item.category} ${item.percent}%`}
            />
          ))}
        </div>

        <div className="mt-3 space-y-2">
          {data.map((item, index) => (
            <div
              key={item.category}
              className="grid grid-cols-[minmax(0,1fr)_minmax(90px,0.9fr)_auto] items-center gap-3 rounded-lg border border-white/6 bg-background/10 px-2.5 py-2"
            >
              <div className="inline-flex min-w-0 items-center gap-2">
                <span
                  className={cn(
                    "size-2.5 shrink-0 rounded-full",
                    segmentClasses[index % segmentClasses.length]
                  )}
                />
                <span className="truncate text-sm font-medium text-foreground/92">
                  {item.category}
                </span>
              </div>

              <div className="h-1.5 overflow-hidden rounded-full bg-background/40">
                <div
                  className={cn(
                    "h-full rounded-full",
                    segmentClasses[index % segmentClasses.length]
                  )}
                  style={{ width: `${item.percent}%` }}
                />
              </div>

              <div className="text-right">
                <div className="text-sm font-medium text-foreground">
                  {item.percent.toFixed(1)}%
                </div>
                <div className="text-[0.68rem] text-muted-foreground">
                  {new Intl.NumberFormat("zh-CN").format(item.value)} tCO2e
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardSectionCard>
  )
}
