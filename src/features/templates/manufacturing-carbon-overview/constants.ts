import type {
  FactoryStatus,
  KpiMetricKey,
  WarningLevel,
} from "@/features/templates/manufacturing-carbon-overview/types"

export const HOMEPAGE_COPY = {
  pageTitle: "制造业能碳总览首页",
  entityNameFallback: "XX制造集团 / XX产业园",
  sections: {
    kpiOverview: "核心能碳指标总览",
    monthlyTrend: "月度碳排趋势",
    emissionStructure: "排放来源结构分析",
    factoryRanking: "工厂能碳表现排行",
    goalProgress: "年度双碳目标达成率",
    warnings: "异常预警与重点关注",
    factoryTable: "工厂能碳明细",
  },
  labels: {
    period: "统计周期",
    updatedAt: "更新时间",
    rankingMetric: "总碳排",
  },
} as const

export const KPI_LABELS: Record<KpiMetricKey, string> = {
  totalEnergy: "综合能耗",
  totalCarbon: "总碳排",
  carbonPerOutput: "单位产值碳排",
  greenPowerRatio: "绿电占比",
}

export const KPI_UNITS: Record<KpiMetricKey, string> = {
  totalEnergy: "tce",
  totalCarbon: "tCO2e",
  carbonPerOutput: "tCO2e/万元",
  greenPowerRatio: "%",
}

export const WARNING_LEVEL_META: Record<
  WarningLevel,
  {
    label: string
    tone: "danger" | "warning" | "neutral"
  }
> = {
  high: {
    label: "高",
    tone: "danger",
  },
  medium: {
    label: "中",
    tone: "warning",
  },
  low: {
    label: "低",
    tone: "neutral",
  },
}

export const FACTORY_STATUS_META: Record<
  FactoryStatus,
  {
    label: string
    tone: "success" | "warning" | "danger"
  }
> = {
  normal: {
    label: "正常",
    tone: "success",
  },
  attention: {
    label: "关注",
    tone: "warning",
  },
  warning: {
    label: "预警",
    tone: "danger",
  },
}

export const FACTORY_RANKING_META = {
  metricKey: "totalCarbon",
  metricLabel: "总碳排",
  unit: KPI_UNITS.totalCarbon,
} as const
