import type { ReactNode } from "react"

import { BaoxiniaoKpiOverviewPanel } from "@/components/home/baoxiniao-kpi-overview-panel"
import { BaoxiniaoSceneVisualPanel } from "@/components/home/baoxiniao-scene-visual-panel"
import { EmissionStructurePanel } from "@/components/home/emission-structure-panel"
import { FactoryRankingPanel } from "@/components/home/factory-ranking-panel"
import type { BaoxiniaoHomepageData } from "@/lib/baoxiniao-homepage/types"

export interface BaoxiniaoHomePageScreenProps {
  data: BaoxiniaoHomepageData
}

const piePalette = ["#11a6a7", "#22bec2", "#49ccd0", "#96e1e3"]

export function BaoxiniaoHomePageScreen({
  data,
}: BaoxiniaoHomePageScreenProps) {
  return (
    <main className="baoxiniao-page h-svh overflow-hidden text-slate-900">
      <div className="flex h-svh flex-col">
        <div className="px-0 pt-0">
          <BaoxiniaoTopBar data={data} />
        </div>

        <div className="mx-auto flex min-h-0 w-full max-w-[1920px] flex-1 px-4 pb-4 sm:px-5 sm:pb-5 xl:px-6 xl:pb-6">
          <div className="relative min-h-0 flex-1">
          <BaoxiniaoSceneVisualPanel
            markers={data.scene.markers}
            className="absolute inset-0 z-0"
          />

          <div className="relative z-10 grid h-full min-h-0 gap-4 p-4 sm:gap-4 sm:p-5 xl:grid-cols-[minmax(18rem,0.92fr)_minmax(0,1.16fr)_minmax(18rem,0.92fr)] xl:grid-rows-[minmax(0,1fr)_minmax(0,1fr)] xl:gap-x-5 xl:gap-y-4 xl:p-5">
            <div className="w-full xl:max-w-[29rem] xl:self-start xl:justify-self-start">
              <BaoxiniaoKpiOverviewPanel metrics={data.overviewKpis} />
            </div>

            <div className="hidden xl:block" />

            <div className="w-full xl:max-w-[29rem] xl:self-start xl:justify-self-end">
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
                className="baoxiniao-float-card rounded-[1.75rem]"
                contentClassName="gap-2.5 px-4 pb-3.5 pt-3"
              />
            </div>

            <div className="w-full xl:max-w-[29rem] xl:self-end xl:justify-self-start">
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
                legendValueFormatter={(item) => `${item.percent.toFixed(2)}%`}
                palette={piePalette}
                className="baoxiniao-float-card rounded-[1.75rem]"
                contentClassName="px-4 pb-3.5 pt-3"
              />
            </div>

            <div className="hidden xl:block" />

            <div className="w-full xl:max-w-[29rem] xl:self-end xl:justify-self-end">
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
                legendValueFormatter={(item) => `${item.percent.toFixed(2)}%`}
                palette={piePalette}
                className="baoxiniao-float-card rounded-[1.75rem]"
                contentClassName="px-4 pb-3.5 pt-3"
              />
            </div>
          </div>
        </div>
      </div>
      </div>
    </main>
  )
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
    <span className="inline-flex size-7 items-center justify-center rounded-full border border-white/52 bg-white/26 text-slate-500 shadow-[0_16px_30px_-24px_rgba(63,81,108,0.38)] backdrop-blur-xl">
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
