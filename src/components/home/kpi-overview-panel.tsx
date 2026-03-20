import { DashboardSectionCard } from "@/components/home/dashboard-section-card"
import { KpiMetricCard } from "@/components/home/kpi-metric-card"
import { HOMEPAGE_COPY } from "@/lib/homepage/constants"
import type { KpiMetric } from "@/lib/homepage/types"

export interface KpiOverviewPanelProps {
  metrics: KpiMetric[]
}

export function KpiOverviewPanel({ metrics }: KpiOverviewPanelProps) {
  return (
    <DashboardSectionCard
      title={HOMEPAGE_COPY.sections.kpiOverview}
      description="中间核心区优先呈现能耗、碳排、效率与绿电结构，作为首页整体判断入口。"
      className="min-h-[28rem] border-cyan-400/12 shadow-cyan-950/20"
      contentClassName="space-y-4"
    >
      <div className="rounded-xl border border-cyan-400/12 bg-gradient-to-r from-cyan-400/10 via-sky-400/6 to-transparent px-4 py-4">
        <div className="text-[0.72rem] tracking-[0.14em] text-cyan-100/78 uppercase">
          总览焦点
        </div>
        <p className="mt-2 text-sm/7 text-foreground/90">
          4 个核心指标共同描述当前能碳运行状态，先看整体结果，再结合两类变化值判断趋势方向。
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {metrics.map((metric) => (
          <KpiMetricCard key={metric.key} metric={metric} />
        ))}
      </div>
    </DashboardSectionCard>
  )
}
