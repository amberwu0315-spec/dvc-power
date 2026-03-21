import type { ReactNode } from "react"

import { DashboardSectionCard } from "@/components/home/dashboard-section-card"
import { HOMEPAGE_COPY } from "@/features/templates/manufacturing-carbon-overview/constants"
import type { EmissionStructureItem } from "@/features/templates/manufacturing-carbon-overview/types"
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
  showLegendValue?: boolean
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
    card: undefined,
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
  showLegendValue = true,
}: EmissionStructurePanelProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0)
  const toneClasses = toneClassMap[tone]
  const resolvedLegendValueFormatter =
    legendValueFormatter ?? defaultLegendValueFormatter
  const pieGradient = buildPieGradient(data, palette)
  const pieCallouts = buildPieCallouts(data, palette)

  return (
    <DashboardSectionCard
      title={title}
      description={description}
      cardUnstyled={tone === "light"}
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
            className={cn("flex flex-col gap-4", showSummaryShell && "mt-3")}
          >
            <div className="relative mx-auto h-[15.5rem] w-full max-w-[20rem] overflow-visible pt-2">
              <svg
                viewBox="0 0 320 240"
                className="pointer-events-none absolute inset-0 z-10 h-full w-full overflow-visible"
                aria-hidden="true"
              >
                {pieCallouts.map((callout) => (
                  <g key={`${callout.item.category}-callout-line`}>
                    <path
                      d={`M ${callout.anchorX} ${callout.anchorY} L ${callout.bendX} ${callout.bendY} L ${callout.labelLineX} ${callout.bendY}`}
                      fill="none"
                      stroke={callout.color}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeOpacity="0.82"
                      strokeWidth="2.1"
                    />

                    <text
                      x={callout.labelTextX}
                      y={callout.bendY + 4}
                      fill={callout.color}
                      fontSize="15"
                      fontWeight="600"
                      letterSpacing="-0.02em"
                      textAnchor={callout.side === "right" ? "start" : "end"}
                    >
                      {formatPercent(callout.item.percent)}
                    </text>
                  </g>
                ))}
              </svg>

              <div
                className={cn(
                  "absolute top-[7.35rem] left-1/2 z-0 aspect-square w-[clamp(10.5rem,20vw,12.75rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/70 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.6),0_24px_40px_-32px_rgba(15,23,42,0.34)]",
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

            <div className="grid gap-x-5 gap-y-2.5 pt-2 sm:grid-cols-2">
              {data.map((item, index) => (
                <StructureLegendItem
                  key={item.category}
                  item={item}
                  color={palette[index % palette.length]}
                  tone={tone}
                  valueFormatter={resolvedLegendValueFormatter}
                  legendStyle={legendStyle}
                  showValue={showLegendValue}
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
  showValue,
}: {
  item: EmissionStructureItem
  color: string
  tone: "dark" | "light"
  valueFormatter: (item: EmissionStructureItem) => string
  legendStyle: "card" | "plain"
  showValue: boolean
}) {
  return (
    <div
      className={cn(
        legendStyle === "plain"
          ? showValue
            ? "grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-0 py-0"
            : "grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 px-0 py-0"
          : "grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-lg border px-3 py-2",
        legendStyle === "card" && toneClassMap[tone].legendItem
      )}
    >
      <span
        className={cn(
          legendStyle === "plain"
            ? "size-3.5 rounded-full"
            : "size-3 rounded-sm"
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
      {showValue ? (
        <span
          className={cn("text-sm font-medium", toneClassMap[tone].valueText)}
        >
          {valueFormatter(item)}
        </span>
      ) : null}
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

function buildPieCallouts(
  data: EmissionStructureItem[],
  palette: string[]
): Array<{
  item: EmissionStructureItem
  color: string
  side: "left" | "right"
  anchorX: number
  anchorY: number
  bendX: number
  bendY: number
  labelLineX: number
  labelTextX: number
  targetY: number
}> {
  const centerX = 160
  const centerY = 112
  const anchorRadius = 82
  const bendRadius = 102
  const lineOuterX = {
    left: 62,
    right: 258,
  } as const
  const textX = {
    left: 54,
    right: 266,
  } as const
  const topBound = 34
  const bottomBound = 198
  const minGap = 30

  let cumulative = 0

  const callouts: Array<{
    item: EmissionStructureItem
    color: string
    side: "left" | "right"
    anchorX: number
    anchorY: number
    bendX: number
    bendY: number
    labelLineX: number
    labelTextX: number
    targetY: number
  }> = data.map((item, index) => {
    const color = palette[index % palette.length]
    const midPercent = cumulative + item.percent / 2
    cumulative += item.percent

    const angle = (midPercent / 100) * Math.PI * 2 - Math.PI / 2
    const side: "left" | "right" = Math.cos(angle) >= 0 ? "right" : "left"
    const anchorX = centerX + Math.cos(angle) * anchorRadius
    const anchorY = centerY + Math.sin(angle) * anchorRadius
    const bendX = centerX + Math.cos(angle) * bendRadius
    const bendY = centerY + Math.sin(angle) * bendRadius

    return {
      item,
      color,
      side,
      anchorX,
      anchorY,
      bendX,
      bendY,
      labelLineX: side === "right" ? lineOuterX.right : lineOuterX.left,
      labelTextX: side === "right" ? textX.right : textX.left,
      targetY: bendY,
    }
  })

  for (const side of ["left", "right"] as const) {
    const sideItems = callouts
      .filter((callout) => callout.side === side)
      .sort((a, b) => a.targetY - b.targetY)

    for (let index = 1; index < sideItems.length; index += 1) {
      sideItems[index].targetY = Math.max(
        sideItems[index].targetY,
        sideItems[index - 1].targetY + minGap
      )
    }

    for (let index = sideItems.length - 2; index >= 0; index -= 1) {
      sideItems[index].targetY = Math.min(
        sideItems[index].targetY,
        sideItems[index + 1].targetY - minGap
      )
    }

    const overflowTop = topBound - (sideItems[0]?.targetY ?? topBound)
    if (overflowTop > 0) {
      sideItems.forEach((item) => {
        item.targetY += overflowTop
      })
    }

    const overflowBottom =
      (sideItems[sideItems.length - 1]?.targetY ?? bottomBound) - bottomBound
    if (overflowBottom > 0) {
      sideItems.forEach((item) => {
        item.targetY -= overflowBottom
      })
    }
  }

  callouts.forEach((callout) => {
    callout.bendY = callout.targetY
  })

  return callouts
}

function formatPercent(value: number) {
  return `${value.toFixed(2)}%`
}
