import type { ReactNode } from "react"

import { Card, CardContent } from "@/components/ui/card"
import { HOMEPAGE_COPY } from "@/lib/homepage/constants"
import type { HomepagePageMeta } from "@/lib/homepage/types"
import { cn } from "@/lib/utils"

export interface HomePageHeaderProps {
  meta: Pick<HomepagePageMeta, "pageTitle" | "entityName"> &
    Partial<Pick<HomepagePageMeta, "periodLabel" | "updatedAt">>
  eyebrow?: string
  contextLabel?: string
  metaItems?: HeaderMetaItemData[]
  leadingSlot?: ReactNode
  trailingSlot?: ReactNode
  tone?: "dark" | "light"
  className?: string
  badgeClassName?: string
  eyebrowClassName?: string
  contentClassName?: string
  titleClassName?: string
}

export interface HeaderMetaItemData {
  label: string
  value: string
  icon?: ReactNode
}

const toneClassMap = {
  dark: {
    card: "stack-card border border-border/60 bg-card/88 shadow-2xl shadow-black/20",
    eyebrow: "text-cyan-100/72",
    badge: "border-cyan-400/20 bg-cyan-400/8 text-cyan-50/90",
    context: "text-muted-foreground",
    metaItem: "border-border/60 bg-background/24",
  },
  light: {
    card: "border border-slate-200/70 bg-white/58 shadow-[0_24px_70px_-38px_rgba(15,23,42,0.28)] backdrop-blur-xl",
    eyebrow: "text-teal-700/80",
    badge:
      "border-white/70 bg-white/56 text-slate-700 shadow-[0_12px_28px_-22px_rgba(15,23,42,0.45)]",
    context: "text-slate-500",
    metaItem:
      "border-white/70 bg-white/56 text-slate-700 shadow-[0_10px_24px_-20px_rgba(15,23,42,0.4)]",
  },
} as const

export function HomePageHeader({
  meta,
  eyebrow = "制造业能碳驾驶舱",
  contextLabel = "园区 / 集团能碳总览",
  metaItems,
  leadingSlot,
  trailingSlot,
  tone = "dark",
  className,
  badgeClassName,
  eyebrowClassName,
  contentClassName,
  titleClassName,
}: HomePageHeaderProps) {
  const toneClasses = toneClassMap[tone]
  const resolvedMetaItems =
    metaItems ??
    [meta.periodLabel, meta.updatedAt]
      .filter((value): value is string => Boolean(value))
      .map((value, index) => ({
        label:
          index === 0
            ? HOMEPAGE_COPY.labels.period
            : HOMEPAGE_COPY.labels.updatedAt,
        value,
      }))

  return (
    <Card className={cn(toneClasses.card, className)} size="sm">
      <CardContent
        className={cn(
          "flex flex-col gap-2.5 px-4 py-2 md:flex-row md:items-center md:justify-between lg:px-5",
          contentClassName
        )}
      >
        <div className="flex min-w-0 items-start gap-3">
          {leadingSlot ? <div className="shrink-0">{leadingSlot}</div> : null}

          <div className="min-w-0 space-y-1.5">
            <div
              className={cn(
                "text-[0.64rem] font-medium tracking-[0.22em] uppercase",
                toneClasses.eyebrow,
                eyebrowClassName
              )}
            >
              {eyebrow}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <h1
                className={cn(
                  "font-heading text-lg font-semibold tracking-tight text-foreground sm:text-xl",
                  tone === "light" && "text-slate-900",
                  titleClassName
                )}
              >
                {meta.pageTitle}
              </h1>
              <span
                className={cn(
                  "inline-flex items-center rounded-full border px-2 py-0.5 text-[0.68rem] font-medium",
                  toneClasses.badge,
                  badgeClassName
                )}
              >
                {meta.entityName}
              </span>
              <span className={cn("text-[0.72rem]", toneClasses.context)}>
                {contextLabel}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 md:justify-end">
          {resolvedMetaItems.map((item) => (
            <HeaderMetaItem
              key={`${item.label}-${item.value}`}
              item={item}
              tone={tone}
            />
          ))}
          {trailingSlot}
        </div>
      </CardContent>
    </Card>
  )
}

function HeaderMetaItem({
  item,
  tone,
}: {
  item: HeaderMetaItemData
  tone: "dark" | "light"
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.72rem]",
        toneClassMap[tone].metaItem
      )}
    >
      {item.icon ? (
        <span className="shrink-0 text-current/72">{item.icon}</span>
      ) : null}
      <span
        className={cn(
          tone === "light" ? "text-slate-500" : "text-muted-foreground"
        )}
      >
        {item.label}
      </span>
      <span
        className={cn(
          "font-medium",
          tone === "light" ? "text-slate-900" : "text-foreground"
        )}
      >
        {item.value}
      </span>
    </div>
  )
}
