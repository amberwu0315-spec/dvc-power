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
    <main className="dark stack-page min-h-svh bg-background text-foreground xl:h-svh">
      <div className="grid min-h-svh w-full max-w-none gap-3 px-3 py-3 sm:px-4 sm:py-4 xl:h-svh xl:grid-rows-[auto_minmax(0,1fr)_minmax(206px,0.3fr)] xl:gap-2.5 xl:px-2 xl:py-4">
        <HomePageHeader meta={data.pageMeta} />

        <section className="grid min-h-0 gap-2.5 xl:grid-cols-[minmax(320px,1.05fr)_minmax(520px,1.22fr)_minmax(320px,1.05fr)]">
          <div className="grid min-h-0 gap-2.5 xl:grid-rows-[minmax(0,1fr)_minmax(0,1fr)]">
            <div className="min-h-0 [&_[data-slot=card-content]]:min-h-0 [&>*]:h-full [&>*]:min-h-0">
              <MonthlyTrendPanel data={data.monthlyTrend} />
            </div>
            <div className="min-h-0 [&_[data-slot=card-content]]:min-h-0 [&>*]:h-full [&>*]:min-h-0">
              <EmissionStructurePanel data={data.emissionStructure} />
            </div>
          </div>

          <div className="min-h-0 [&_[data-slot=card-content]]:min-h-0 [&>*]:h-full [&>*]:min-h-0">
            <KpiOverviewPanel metrics={data.kpis} />
          </div>

          <div className="grid min-h-0 gap-2.5 xl:grid-rows-[minmax(0,1.05fr)_minmax(0,0.8fr)_minmax(0,0.95fr)]">
            <div className="min-h-0 [&_[data-slot=card-content]]:min-h-0 [&>*]:h-full [&>*]:min-h-0">
              <FactoryRankingPanel data={data.factoryRanking} />
            </div>
            <div className="min-h-0 [&_[data-slot=card-content]]:min-h-0 [&>*]:h-full [&>*]:min-h-0">
              <GoalProgressPanel data={data.goalProgress} />
            </div>
            <div className="min-h-0 [&_[data-slot=card-content]]:min-h-0 [&>*]:h-full [&>*]:min-h-0">
              <WarningListPanel items={data.warnings} />
            </div>
          </div>
        </section>

        <div className="min-h-0 [&>*]:h-full [&>*]:min-h-0">
          <FactoryTablePanel rows={data.factoryTable} />
        </div>
      </div>
    </main>
  )
}
