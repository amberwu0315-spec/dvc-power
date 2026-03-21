import type { ReactNode } from "react"

import { BaoxiniaoKpiOverviewPanel } from "@/components/home/baoxiniao-kpi-overview-panel"
import {
  BaoxiniaoSceneVisualPanel,
  type BaoxiniaoSceneStatusItem,
} from "@/components/home/baoxiniao-scene-visual-panel"
import { EmissionStructurePanel } from "@/components/home/emission-structure-panel"
import { FactoryRankingPanel } from "@/components/home/factory-ranking-panel"
import type { BaoxiniaoHomepageData } from "@/lib/baoxiniao-homepage/types"

export interface BaoxiniaoHomePageScreenProps {
  data: BaoxiniaoHomepageData
}

const piePalette = ["#11a6a7", "#22bec2", "#49ccd0", "#96e1e3"]
const sidePanelShellClassName =
  "baoxiniao-shell-card h-full gap-0 py-0 rounded-[1.9rem]"

export function BaoxiniaoHomePageScreen({
  data,
}: BaoxiniaoHomePageScreenProps) {
  const sceneStatusItems = buildSceneStatusItems(data)

  return (
    <main className="baoxiniao-page h-svh overflow-hidden text-slate-900">
      <div className="flex h-svh flex-col">
        <div className="shrink-0 px-0 pt-0">
          <BaoxiniaoTopBar data={data} />
        </div>

        <section className="flex min-h-0 w-full flex-1 px-4 pb-4 pt-3 sm:px-5 sm:pb-5 sm:pt-4 xl:px-6 xl:pb-6 xl:pt-5">
          <div className="grid h-full min-h-0 w-full gap-4 sm:gap-5 xl:gap-6 lg:grid-cols-[minmax(21rem,23rem)_minmax(0,1fr)_minmax(21rem,23rem)] xl:grid-cols-[26rem_minmax(0,1fr)_26rem] 2xl:grid-cols-[27rem_minmax(0,1fr)_27rem]">
            <aside className="baoxiniao-side-band baoxiniao-side-band--left min-h-0">
              <div className="baoxiniao-side-stack flex h-full min-h-0 flex-col gap-3 sm:gap-4 xl:gap-[1.125rem]">
                <div className="min-h-0 flex-[1.04]">
                  <BaoxiniaoKpiOverviewPanel
                    metrics={data.overviewKpis}
                    className="baoxiniao-rail-card baoxiniao-kpi-board baoxiniao-rail-card--top rounded-[1.9rem] rounded-b-[1.15rem]"
                  />
                </div>

                <div className="min-h-0 flex-[1.03]">
                  <EmissionStructurePanel
                    data={data.organizationFootprintShare}
                    title="组织碳足迹范围占比"
                    description=""
                    chartType="pie"
                    tone="light"
                    headerAside={<PanelArrowIcon />}
                    showTotalInHeader={false}
                    showSummaryShell={false}
                    legendStyle="plain"
                    showLegendValue={false}
                    palette={piePalette}
                    className={`${sidePanelShellClassName} rounded-t-[1.15rem]`}
                    contentClassName="px-4 pb-4 pt-3.5"
                  />
                </div>
              </div>
            </aside>

            <section className="baoxiniao-visual-stage min-h-[26rem] lg:min-h-0">
              <BaoxiniaoSceneVisualPanel
                markers={data.scene.markers}
                title="总部园区主视觉"
                subtitle="保留建筑主体作为核心视觉，承接组织级总览信息与分析信息带。"
                statusItems={sceneStatusItems}
                className="absolute inset-0 z-0"
              />
            </section>

            <aside className="baoxiniao-side-band baoxiniao-side-band--right min-h-0">
              <div className="baoxiniao-side-stack flex h-full min-h-0 flex-col gap-3 sm:gap-4 xl:gap-[1.125rem]">
                <div className="min-h-0 flex-[0.82]">
                  <FactoryRankingPanel
                    data={data.productFootprintRanking}
                    title="产品碳足迹 top 5 (kgCO₂e)"
                    description=""
                    summary={null}
                    tone="light"
                    valueFormatter={(value) => value.toFixed(4)}
                    headerAside={<PanelArrowIcon />}
                    showCollapsedSummary={false}
                    showSummary={false}
                    listStyle="plain"
                    showRankBadge={false}
                    className={`${sidePanelShellClassName} rounded-b-[1.15rem]`}
                    contentClassName="gap-2.5 px-4 pb-3 pt-3.5"
                  />
                </div>

                <div className="min-h-0 flex-[1.18]">
                  <EmissionStructurePanel
                    data={data.projectTypeShare}
                    title="减排项目类型占比"
                    description=""
                    chartType="pie"
                    tone="light"
                    headerAside={<PanelArrowIcon />}
                    showTotalInHeader={false}
                    showSummaryShell={false}
                    legendStyle="plain"
                    showLegendValue={false}
                    palette={piePalette}
                    className={`${sidePanelShellClassName} rounded-t-[1.15rem]`}
                    contentClassName="px-4 pb-4 pt-3.5"
                  />
                </div>
              </div>
            </aside>
          </div>
        </section>
      </div>
    </main>
  )
}

function buildSceneStatusItems(
  data: BaoxiniaoHomepageData
): BaoxiniaoSceneStatusItem[] {
  const scopeThreeShare =
    data.organizationFootprintShare.find((item) => item.category === "范围三") ??
    data.organizationFootprintShare.reduce((max, item) =>
      item.percent > max.percent ? item : max
    )
  const highestFootprintProduct = data.productFootprintRanking.reduce((max, item) =>
    item.value > max.value ? item : max
  )

  return [
    {
      label: "组织主体",
      value: `${data.pageMeta.organizationName} · ${data.pageMeta.yearLabel}`,
    },
    {
      label: "范围三占比",
      value: `${scopeThreeShare.percent.toFixed(1)}%`,
    },
    {
      label: "高值产品足迹",
      value: `${highestFootprintProduct.value.toFixed(2)} kgCO2e`,
    },
  ]
}

function BaoxiniaoTopBar({ data }: { data: BaoxiniaoHomepageData }) {
  return (
    <header className="baoxiniao-topbar flex shrink-0 flex-wrap items-center justify-between gap-3 px-4 py-2.5 sm:px-5 xl:px-6">
      <div className="flex min-w-0 items-center gap-3 sm:gap-4">
        <SaintAngeloLogo />
        <div className="hidden h-10 w-px bg-teal-900/12 lg:block" />
        <h1 className="truncate text-[1.6rem] font-semibold tracking-tight text-teal-700 sm:text-[2rem]">
          {data.pageMeta.pageTitle}
        </h1>
      </div>

      <div className="flex flex-wrap items-center gap-2 xl:mr-auto xl:ml-6">
        <TopBarChip icon={<OrganizationIcon />} value={data.pageMeta.organizationName} />
        <TopBarChip icon={<CalendarIcon />} value={data.pageMeta.yearLabel} />
      </div>

      <div className="inline-flex items-center gap-2 text-[1.05rem] font-medium text-slate-900">
        <SunIcon />
        <span>{data.pageMeta.weatherLabel}</span>
      </div>
    </header>
  )
}

function TopBarChip({
  icon,
  value,
}: {
  icon: ReactNode
  value: string
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/55 bg-white/28 px-3 py-1.5 text-[0.95rem] font-medium text-slate-700 shadow-[0_18px_34px_-28px_rgba(63,81,108,0.35)] backdrop-blur-xl">
      <span className="text-current/72">{icon}</span>
      <span>{value}</span>
      <ChevronDownIcon />
    </span>
  )
}

function SaintAngeloLogo() {
  return (
    <svg
      aria-label="报喜鸟 Saint Angelo"
      role="img"
      viewBox="0 0 290 112"
      className="h-12 w-auto shrink-0 sm:h-14"
    >
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path
          d="M92 13c17 11 29 23 40 39"
          stroke="#0f2e63"
          strokeWidth="4"
        />
        <path
          d="M121 7c7 6 12 13 15 21"
          stroke="#db4b43"
          strokeWidth="6"
        />
        <path
          d="M120 53c16 16 39 25 64 25 25 0 47-8 68-24"
          stroke="#0f2e63"
          strokeWidth="5"
        />
        <path
          d="M188 24c19-1 34 2 48 10"
          stroke="#0f2e63"
          strokeWidth="4"
        />
        <path
          d="M179 37c21-1 41 4 57 14"
          stroke="#0f2e63"
          strokeWidth="4"
        />
        <path
          d="M174 52c24 0 43 5 58 15"
          stroke="#0f2e63"
          strokeWidth="4"
        />
        <path
          d="M153 29c-10 8-13 18-12 32 1 15 7 26 18 35"
          stroke="#0f2e63"
          strokeWidth="4"
        />
      </g>
      <text
        x="0"
        y="62"
        fill="#0f2e63"
        fontFamily="'Noto Serif SC','Songti SC','STSong',serif"
        fontSize="34"
        letterSpacing="2"
      >
        报喜鸟
      </text>
      <path d="M0 74h124" stroke="#0f2e63" strokeWidth="1.5" />
      <text
        x="0"
        y="104"
        fill="#0f2e63"
        fontFamily="Georgia,'Times New Roman',serif"
        fontSize="28"
        letterSpacing="2"
      >
        SAINT ANGELO
      </text>
    </svg>
  )
}

function OrganizationIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" aria-hidden="true">
      <path
        d="M2.5 13.2V3.8h4.1v9.4M9.4 13.2V6h4.1v7.2M4.5 6.4h0M4.5 8.7h0M4.5 11h0M11.5 8.2h0M11.5 10.5h0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" aria-hidden="true">
      <path
        d="M3 4.7h10M5.2 2.5v2.6M10.8 2.5v2.6M3.5 4.2h9a1 1 0 0 1 1 1v6.8a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1V5.2a1 1 0 0 1 1-1Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-3.5 text-current/68" aria-hidden="true">
      <path
        d="m4.6 6.4 3.4 3.4 3.4-3.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function SunIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-5 text-amber-400" aria-hidden="true">
      <circle cx="10" cy="10" r="3.6" fill="currentColor" />
      <path
        d="M10 1.9v2.2M10 15.9v2.2M18.1 10h-2.2M4.1 10H1.9M15.7 4.3l-1.6 1.6M5.9 14.1l-1.6 1.6M15.7 15.7l-1.6-1.6M5.9 5.9 4.3 4.3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

function PanelArrowIcon() {
  return (
    <span className="inline-flex size-7 items-center justify-center rounded-full border border-white/38 bg-white/18 text-slate-500 shadow-[0_14px_26px_-24px_rgba(63,81,108,0.24)] backdrop-blur-xl">
      <svg viewBox="0 0 16 16" className="size-4" aria-hidden="true">
        <path
          d="m6.1 3.5 4 4.5-4 4.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}
