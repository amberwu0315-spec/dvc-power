import { DashboardSectionCard } from "@/components/home/dashboard-section-card"
import { HomePageHeader } from "@/components/home/home-page-header"
import { FACTORY_RANKING_META, HOMEPAGE_COPY } from "@/lib/homepage/constants"
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
            <DashboardSectionCard
              title={HOMEPAGE_COPY.sections.monthlyTrend}
              description="左上区占位，后续承接月度能耗与碳排双折线图。"
            >
              <SectionPlaceholder
                summary={`已接入 ${data.monthlyTrend.length} 个月趋势数据`}
                details="后续在这里渲染能耗与碳排的月度变化曲线。"
              />
            </DashboardSectionCard>

            <DashboardSectionCard
              title={HOMEPAGE_COPY.sections.emissionStructure}
              description="左下区占位，后续承接排放来源构成分析。"
            >
              <SectionPlaceholder
                summary={`已接入 ${data.emissionStructure.length} 类排放来源`}
                details="后续在这里渲染环图或堆叠柱图，并展示结构占比。"
              />
            </DashboardSectionCard>
          </div>

          <DashboardSectionCard
            title={HOMEPAGE_COPY.sections.kpiOverview}
            description="中间核心区先承接 4 个 KPI 卡片，后续再补图表和状态样式。"
            className="min-h-[24rem]"
            contentClassName="grid gap-3 sm:grid-cols-2"
          >
            {data.kpis.map((metric) => (
              <article
                key={metric.key}
                className="rounded-xl border border-border/60 bg-background/30 p-4"
              >
                <div className="text-[0.72rem] font-medium tracking-[0.12em] text-muted-foreground uppercase">
                  {metric.label}
                </div>
                <div className="mt-4 flex items-end justify-between gap-3">
                  <div>
                    <div className="text-2xl font-semibold tracking-tight text-foreground">
                      {metric.value}
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      单位：{metric.unit}
                    </div>
                  </div>
                  <div className="space-y-1 text-right text-xs text-muted-foreground">
                    <div>同比 {metric.yoy}%</div>
                    <div>较上月 {metric.mom}%</div>
                  </div>
                </div>
              </article>
            ))}
          </DashboardSectionCard>

          <div className="grid gap-4">
            <DashboardSectionCard
              title={HOMEPAGE_COPY.sections.factoryRanking}
              description={`右上区占位，默认按${FACTORY_RANKING_META.metricLabel}排序。`}
            >
              <SectionPlaceholder
                summary={`已接入 ${data.factoryRanking.length} 个工厂排行对象`}
                details={`后续在这里渲染按${FACTORY_RANKING_META.metricLabel}排序的横向条形图。`}
              />
            </DashboardSectionCard>

            <DashboardSectionCard
              title={HOMEPAGE_COPY.sections.goalProgress}
              description="右中区占位，后续承接年度双碳目标达成进度。"
            >
              <SectionPlaceholder
                summary={`当前完成率 ${data.goalProgress.completionRate}%`}
                details="后续在这里渲染目标值、当前值、差值与环形进度表现。"
              />
            </DashboardSectionCard>

            <DashboardSectionCard
              title={HOMEPAGE_COPY.sections.warnings}
              description="右下区占位，后续承接预警列表与状态标签。"
            >
              <SectionPlaceholder
                summary={`当前有 ${data.warnings.length} 条预警记录`}
                details="后续在这里渲染预警等级、异常摘要与时间信息。"
              />
            </DashboardSectionCard>
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
