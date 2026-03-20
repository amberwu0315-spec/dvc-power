import { HomePageHeader } from "@/components/home/home-page-header"
import { EmissionStructurePanel } from "@/components/home/emission-structure-panel"
import { FactoryRankingPanel } from "@/components/home/factory-ranking-panel"
import { FactoryTablePanel } from "@/components/home/factory-table-panel"
import { GoalProgressPanel } from "@/components/home/goal-progress-panel"
import { KpiOverviewPanel } from "@/components/home/kpi-overview-panel"
import { MonthlyTrendPanel } from "@/components/home/monthly-trend-panel"
import { WarningListPanel } from "@/components/home/warning-list-panel"
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

        <FactoryTablePanel rows={data.factoryTable} />
      </div>
    </main>
  )
}
