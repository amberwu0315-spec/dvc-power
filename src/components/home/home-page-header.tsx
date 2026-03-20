import { Card, CardContent } from "@/components/ui/card"
import { HOMEPAGE_COPY } from "@/lib/homepage/constants"
import type { HomepagePageMeta } from "@/lib/homepage/types"

export interface HomePageHeaderProps {
  meta: HomepagePageMeta
}

export function HomePageHeader({ meta }: HomePageHeaderProps) {
  return (
    <Card className="stack-card border border-border/60 bg-card/88 shadow-2xl shadow-black/20">
      <CardContent className="grid gap-4 px-5 py-5 md:grid-cols-[minmax(0,1fr)_minmax(220px,0.9fr)_minmax(220px,0.85fr)] md:items-center lg:px-6">
        <div className="space-y-2.5">
          <div className="text-[0.68rem] font-medium tracking-[0.24em] text-cyan-100/72 uppercase">
            制造业能碳驾驶舱
          </div>
          <div>
            <h1 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {meta.pageTitle}
            </h1>
          </div>
        </div>

        <div className="space-y-2 md:text-center">
          <p className="text-lg font-medium tracking-[0.02em] text-foreground/92 sm:text-xl">
            {meta.entityName}
          </p>
          <p className="text-sm text-muted-foreground">园区 / 集团能碳总览</p>
        </div>

        <div className="grid gap-3 rounded-xl border border-border/60 bg-background/30 p-4 md:justify-self-end">
          <div className="flex items-center justify-between gap-4 text-sm">
            <span className="text-muted-foreground">
              {HOMEPAGE_COPY.labels.period}
            </span>
            <span className="font-medium text-foreground">{meta.periodLabel}</span>
          </div>
          <div className="flex items-center justify-between gap-4 text-sm">
            <span className="text-muted-foreground">
              {HOMEPAGE_COPY.labels.updatedAt}
            </span>
            <span className="font-medium text-foreground">{meta.updatedAt}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
