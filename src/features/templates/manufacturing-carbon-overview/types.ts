export type TrendDirection = "up" | "down" | "flat"

export type WarningLevel = "high" | "medium" | "low"

export type FactoryStatus = "normal" | "attention" | "warning"

export type KpiMetricKey =
  | "totalEnergy"
  | "totalCarbon"
  | "carbonPerOutput"
  | "greenPowerRatio"

export interface HomepagePageMeta {
  pageTitle: string
  entityName: string
  periodLabel: string
  updatedAt: string
}

export interface KpiMetric {
  key: KpiMetricKey
  label: string
  value: number
  unit: string
  yoy: number
  mom: number
  trend: TrendDirection
}

export interface MonthlyTrendPoint {
  month: string
  energy: number
  carbon: number
}

export interface EmissionStructureItem {
  category: string
  value: number
  percent: number
}

export interface FactoryRankingItem {
  factoryName: string
  rankValue: number
  rank: number
}

export interface GoalProgress {
  targetValue: number
  currentValue: number
  completionRate: number
  gapValue: number
}

export interface WarningItem {
  id: string
  warningType: string
  factoryName: string
  level: WarningLevel
  message: string
  time: string
}

export interface FactoryTableRow {
  id: string
  factoryName: string
  energy: number
  carbon: number
  carbonPerOutput: number
  greenPowerRatio: number
  status: FactoryStatus
}

export interface HomepageDashboardData {
  pageMeta: HomepagePageMeta
  kpis: KpiMetric[]
  monthlyTrend: MonthlyTrendPoint[]
  emissionStructure: EmissionStructureItem[]
  factoryRanking: FactoryRankingItem[]
  goalProgress: GoalProgress
  warnings: WarningItem[]
  factoryTable: FactoryTableRow[]
}
