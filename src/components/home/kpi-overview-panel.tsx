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
      description="中间核心区聚焦 4 个核心指标，并通过同比与较上月变化辅助判断整体表现。"
      className="min-h-[24rem]"
      contentClassName="space-y-4"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {metrics.map((metric) => (
          <KpiMetricCard key={metric.key} metric={metric} />
        ))}
      </div>

      <div className="grid gap-3 rounded-xl border border-border/50 bg-background/20 px-4 py-3 text-sm text-muted-foreground sm:grid-cols-3">
        <div>
          <span className="text-foreground/90">{metrics.length}</span> 个核心指标
          已完成接入
        </div>
        <div>当前阶段优先确保数据卡片表达成立</div>
        <div>后续可继续补趋势图标、状态色和动画反馈</div>
      </div>
    </DashboardSectionCard>
  )
}
