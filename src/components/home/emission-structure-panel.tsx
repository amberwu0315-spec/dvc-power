import type { ReactNode } from "react"

import { DashboardSectionCard } from "@/components/home/dashboard-section-card"
import { HOMEPAGE_COPY } from "@/lib/homepage/constants"
import type { EmissionStructureItem } from "@/lib/homepage/types"
import { cn } from "@/lib/utils"

export interface EmissionStructurePanelProps {
  data: EmissionStructureItem[]
  title?: string
  description?: string
  chartType?: "bar" | "pie"
  headerAside?: ReactNode
  tone?: "dark" | "light"
  className?: string
  contentClassName?: string
  palette?: string[]
  totalUnit?: string
  showTotalInHeader?: boolean
  summaryLabel?: string
  legendValueFormatter?: (item: EmissionStructureItem) => string
  centerLabel?: string
  showSummaryShell?: boolean
  legendStyle?: "card" | "plain"
}

const defaultPalette = [
  "#67e8f9",
  "#7dd3fc",
  "#6ee7b7",
  "#c4b5fd",
  "#fbbf24",
  "#fb7185",
]

const toneClassMap = {
  dark: {
    card: undefined,
    headerBadge: "border-border/60 bg-background/24 text-foreground/88",
    shell: "border-border/50 bg-background/20",
    shellMuted: "text-muted-foreground",
    legendItem: "border-white/6 bg-background/10",
    valueText: "text-foreground",
    valueSubtext: "text-muted-foreground",
    pieInner: "bg-[rgba(8,15,27,0.75)]",
  },
  light: {
    card: "border-white/40 bg-white/30 shadow-[0_30px_80px_-52px_rgba(15,23,42,0.2)] backdrop-blur-2xl",
    headerBadge:
      "border-white/42 bg-white/24 text-slate-600 shadow-[0_14px_28px_-24px_rgba(15,23,42,0.24)]",
    shell: "border-white/24 bg-white/14",
    shellMuted: "text-slate-500/88",
    legendItem: "border-white/16 bg-white/16",
    valueText: "text-slate-800",
    valueSubtext: "text-slate-500/86",
    pieInner: "bg-[rgba(255,255,255,0.72)]",
  },
} as const

export function EmissionStructurePanel({
  data,
  title = HOMEPAGE_COPY.sections.emissionStructure,
  description = "4 类排放来源占比",
  chartType = "bar",
  headerAside,
  tone = "dark",
  className,
  contentClassName,
  palette = defaultPalette,
  totalUnit = "tCO2e",
  showTotalInHeader = true,
  summaryLabel = "排放构成总览",
  legendValueFormatter,
  centerLabel,
  showSummaryShell = true,
  legendStyle = "card",
}: EmissionStructurePanelProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0)
  const toneClasses = toneClassMap[tone]
  const resolvedLegendValueFormatter =
    legendValueFormatter ?? defaultLegendValueFormatter
  const pieGradient = buildPieGradient(data, palette)

  return (
    <DashboardSectionCard
      title={title}
      description={description}
      headerAside={
        headerAside ??
        (showTotalInHeader ? (
          <div
            className={cn(
              "inline-flex items-center rounded-full border px-2 py-0.5 text-[0.64rem] leading-4",
              toneClasses.headerBadge
            )}
          >
            {new Intl.NumberFormat("zh-CN", {
              maximumFractionDigits: 0,
            }).format(total)}
            <span className="ml-1 opacity-[0.72]">{totalUnit}</span>
          </div>
        ) : undefined)
      }
      descriptionClassName="text-[0.68rem] leading-4"
      className={cn(toneClasses.card, className)}
      contentClassName={cn(
        "flex min-h-0 flex-col gap-2 px-3 py-2",
        contentClassName
      )}
    >
      <div
        className={cn(
          showSummaryShell
            ? "rounded-lg border px-3 py-2.5"
            : "border-0 bg-transparent px-0 py-0",
          showSummaryShell && toneClasses.shell
        )}
      >
        {showSummaryShell ? (
          <div
            className={cn(
              "flex items-center justify-between gap-3 text-[0.64rem] leading-4",
              toneClasses.shellMuted
            )}
          >
            <span>{summaryLabel}</span>
            <span>{data.length} 类来源</span>
          </div>
        ) : null}

        {chartType === "pie" ? (
          <div
            className={cn(
              "grid gap-3 lg:grid-cols-[minmax(150px,190px)_minmax(0,1fr)] lg:items-center",
              showSummaryShell && "mt-3"
            )}
          >
            <div className="mx-auto">
              <div
                className={cn(
                  "relative aspect-square w-[clamp(9.5rem,20vw,12.5rem)] rounded-full border border-white/70 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.6),0_24px_40px_-32px_rgba(15,23,42,0.34)]",
                  legendStyle === "plain" &&
                    "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.75),0_28px_48px_-34px_rgba(15,23,42,0.26)]"
                )}
                style={{ background: pieGradient }}
              >
                <div
                  className={cn(
                    "absolute inset-[18%] rounded-full border border-white/60 backdrop-blur-sm",
                    toneClasses.pieInner
                  )}
                />
                {centerLabel ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span
                      className={cn(
                        "max-w-24 text-center text-[0.72rem] font-medium tracking-[0.14em] uppercase",
                        toneClasses.shellMuted
                      )}
                    >
                      {centerLabel}
                    </span>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="space-y-2">
              {data.map((item, index) => (
                <StructureLegendItem
                  key={item.category}
                  item={item}
                  color={palette[index % palette.length]}
                  tone={tone}
                  valueFormatter={resolvedLegendValueFormatter}
                  legendStyle={legendStyle}
                />
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="mt-2.5 flex h-3.5 overflow-hidden rounded-full border border-white/10 bg-background/30">
              {data.map((item, index) => (
                <div
                  key={item.category}
                  style={{
                    width: `${item.percent}%`,
                    backgroundColor: palette[index % palette.length],
                  }}
                  title={`${item.category} ${item.percent}%`}
                />
              ))}
            </div>

            <div className="mt-2.5 space-y-1.5">
              {data.map((item, index) => (
                <div
                  key={item.category}
                  className={cn(
                    "grid grid-cols-[minmax(0,1fr)_minmax(72px,0.75fr)_auto] items-center gap-2.5 rounded-lg border px-2.5 py-1.5",
                    toneClasses.legendItem
                  )}
                >
                  <div className="inline-flex min-w-0 items-center gap-2">
                    <span
                      className="size-2.5 shrink-0 rounded-full"
                      style={{
                        backgroundColor: palette[index % palette.length],
                      }}
                    />
                    <span
                      className={cn(
                        "truncate text-[0.82rem] font-medium",
                        tone === "light"
                          ? "text-slate-800"
                          : "text-foreground/92"
                      )}
                    >
                      {item.category}
                    </span>
                  </div>

                  <div
                    className={cn(
                      "h-1.5 overflow-hidden rounded-full",
                      tone === "light" ? "bg-slate-200/70" : "bg-background/40"
                    )}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${item.percent}%`,
                        backgroundColor: palette[index % palette.length],
                      }}
                    />
                  </div>

                  <div className="text-right">
                    <div
                      className={cn(
                        "text-[0.82rem] font-medium",
                        toneClasses.valueText
                      )}
                    >
                      {item.percent.toFixed(1)}%
                    </div>
                    <div
                      className={cn("text-[0.62rem]", toneClasses.valueSubtext)}
                    >
                      {resolvedLegendValueFormatter(item)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </DashboardSectionCard>
  )
}

function StructureLegendItem({
  item,
  color,
  tone,
  valueFormatter,
  legendStyle,
}: {
  item: EmissionStructureItem
  color: string
  tone: "dark" | "light"
  valueFormatter: (item: EmissionStructureItem) => string
  legendStyle: "card" | "plain"
}) {
  return (
    <div
      className={cn(
        legendStyle === "plain"
          ? "grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-0 py-0"
          : "grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-lg border px-3 py-2",
        legendStyle === "card" && toneClassMap[tone].legendItem
      )}
    >
      <span
        className={cn(
          legendStyle === "plain" ? "size-3.5 rounded-full" : "size-3 rounded-sm"
        )}
        style={{ backgroundColor: color }}
      />
      <span
        className={cn(
          "truncate text-sm font-medium",
          tone === "light" ? "text-slate-800" : "text-foreground/92"
        )}
      >
        {item.category}
      </span>
      <span className={cn("text-sm font-medium", toneClassMap[tone].valueText)}>
        {valueFormatter(item)}
      </span>
    </div>
  )
}

function defaultLegendValueFormatter(item: EmissionStructureItem) {
  return `${new Intl.NumberFormat("zh-CN").format(item.value)} tCO2e`
}

function buildPieGradient(data: EmissionStructureItem[], palette: string[]) {
  let start = 0
  const segments = data.map((item, index) => {
    const end = start + item.percent
    const segment = `${palette[index % palette.length]} ${start}% ${end}%`
    start = end
    return segment
  })

  return `conic-gradient(${segments.join(", ")})`
}
