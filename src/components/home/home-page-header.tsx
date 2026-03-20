import { Card, CardContent } from "@/components/ui/card"
import { HOMEPAGE_COPY } from "@/lib/homepage/constants"
import type { HomepagePageMeta } from "@/lib/homepage/types"

export interface HomePageHeaderProps {
  meta: HomepagePageMeta
}

export function HomePageHeader({ meta }: HomePageHeaderProps) {
  return (
    <Card
      className="stack-card border border-border/60 bg-card/88 shadow-2xl shadow-black/20"
      size="sm"
    >
      <CardContent className="flex flex-col gap-3 px-4 py-2.5 md:flex-row md:items-center md:justify-between lg:px-5">
        <div className="min-w-0 space-y-2">
          <div className="text-[0.68rem] font-medium tracking-[0.24em] text-cyan-100/72 uppercase">
            制造业能碳驾驶舱
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="font-heading text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              {meta.pageTitle}
            </h1>
            <span className="inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/8 px-2.5 py-1 text-xs font-medium text-cyan-50/90">
              {meta.entityName}
            </span>
            <span className="text-xs text-muted-foreground">园区 / 集团能碳总览</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 md:justify-end">
          <HeaderMetaItem
            label={HOMEPAGE_COPY.labels.period}
            value={meta.periodLabel}
          />
          <HeaderMetaItem
            label={HOMEPAGE_COPY.labels.updatedAt}
            value={meta.updatedAt}
          />
        </div>
      </CardContent>
    </Card>
  )
}

function HeaderMetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/24 px-3 py-1.5 text-xs">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-foreground">{value}</span>
    </div>
  )
}
