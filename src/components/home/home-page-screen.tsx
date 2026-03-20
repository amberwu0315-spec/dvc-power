import { HomePageHeader } from "@/components/home/home-page-header"
import { DashboardSectionCard } from "@/components/home/dashboard-section-card"
import { EmissionStructurePanel } from "@/components/home/emission-structure-panel"
import { FactoryRankingPanel } from "@/components/home/factory-ranking-panel"
import { GoalProgressPanel } from "@/components/home/goal-progress-panel"
import { KpiOverviewPanel } from "@/components/home/kpi-overview-panel"
import { MonthlyTrendPanel } from "@/components/home/monthly-trend-panel"
import { WarningListPanel } from "@/components/home/warning-list-panel"
import { HOMEPAGE_COPY } from "@/lib/homepage/constants"
import type { HomepageDashboardData } from "@/lib/homepage/types"

export interface HomePageScreenProps {
  data: HomepageDashboardData
}

export function HomePageScreen({ data }: HomePageScreenProps) {
  return (
    <main className="dark stack-page min-h-svh bg-background text-foreground">
      <div className="mx-auto flex min-h-svh w-full max-w-[1560px] flex-col gap-4 px-4 py-4 sm:px-6 sm:py-5 lg:gap-5 lg:px-8 lg:py-6">
        <HomePageHeader meta={data.pageMeta} />

        <section className="grid gap-4 xl:grid-cols-[minmax(280px,0.92fr)_minmax(440px,1.28fr)_minmax(300px,0.96fr)]">
          <div className="grid gap-4">
            <MonthlyTrendPanel data={data.monthlyTrend} />
            <EmissionStructurePanel data={data.emissionStructure} />
          </div>

          <KpiOverviewPanel metrics={data.kpis} />

          <div className="grid gap-4">
            <FactoryRankingPanel data={data.factoryRanking} />
            <GoalProgressPanel data={data.goalProgress} />
            <WarningListPanel items={data.warnings} />
          </div>
        </section>

        <DashboardSectionCard
          title={HOMEPAGE_COPY.sections.factoryTable}
          description="底部区占位，后续承接 6 列工厂能碳明细表。"
        >
          <SectionPlaceholder
            summary={`已接入 ${data.factoryTable.length} 行工厂明细数据`}
            details="后续在这里渲染首页底部精简表格，承接工厂级能碳对比。"
          />
        </DashboardSectionCard>
      </div>
    </main>
  )
}

interface SectionPlaceholderProps {
  summary: string
  details: string
}

function SectionPlaceholder({ summary, details }: SectionPlaceholderProps) {
  return (
    <div className="flex min-h-[9rem] flex-col justify-between gap-5 rounded-xl border border-dashed border-border/60 bg-background/20 p-4">
      <div className="space-y-2">
        <p className="text-sm font-medium text-foreground/92">{summary}</p>
        <p className="text-sm/6 text-muted-foreground">{details}</p>
      </div>

      <div className="rounded-lg border border-border/50 bg-background/30 px-3 py-2 text-xs text-muted-foreground">
        当前阶段先完成页面结构和数据传递，后续逐块补充图表、排行和表格实现。
      </div>
    </div>
  )
}
