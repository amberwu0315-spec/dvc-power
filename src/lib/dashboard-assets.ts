export type DashboardAssetKind = "template" | "case"

export interface DashboardAssetDefinition {
  id: string
  slug: string
  kind: DashboardAssetKind
  title: string
  routePath: string
  pageGoal: string
  modules: string[]
  chartTypes: string[]
  fakeDataNeeds: string[]
  organizationReason: string
  derivedFrom?: string
}

export const DASHBOARD_ASSET_GROUPS: Record<
  DashboardAssetKind,
  {
    title: string
    description: string
    routePath: string
  }
> = {
  template: {
    title: "通用模板",
    description: "面向行业或场景沉淀可复用骨架，负责后续派生和扩展。",
    routePath: "/templates",
  },
  case: {
    title: "具体案例",
    description: "面向真实客户做品牌化和场景化表达，负责 demo 展示和讲述。",
    routePath: "/cases",
  },
}

export const DASHBOARD_ASSETS: DashboardAssetDefinition[] = [
  {
    id: "manufacturing-carbon-overview",
    slug: "manufacturing-carbon-overview",
    kind: "template",
    title: "制造业能碳总览模板",
    routePath: "/templates/manufacturing-carbon-overview",
    pageGoal: "沉淀制造业能碳总览型首页骨架，作为后续客户案例的复用母版。",
    modules: [
      "顶部标题区",
      "KPI 总览",
      "月度趋势",
      "排放结构",
      "工厂排行",
      "目标达成",
      "预警列表",
      "工厂明细",
    ],
    chartTypes: ["指标卡", "折线图", "环图", "横向条形图", "进度条", "表格"],
    fakeDataNeeds: [
      "园区或集团基础信息",
      "近 12 个月能耗与碳排趋势",
      "排放来源构成",
      "工厂排行与工厂明细",
      "目标值与预警假数据",
    ],
    organizationReason:
      "采用总览型首页标准骨架，先把行业共性结构固化，方便后续从模板继续派生客户案例。",
  },
  {
    id: "baoxiniao-carbon-cockpit",
    slug: "baoxiniao-carbon-cockpit",
    kind: "case",
    title: "报喜鸟碳驾驶舱案例",
    routePath: "/cases/baoxiniao-carbon-cockpit",
    pageGoal: "展示模板如何被报喜鸟品牌化、场景化适配为客户案例页面。",
    modules: [
      "品牌顶栏",
      "组织级 KPI",
      "园区主视觉",
      "产品足迹排行",
      "组织范围占比",
      "减排项目类型占比",
    ],
    chartTypes: ["指标卡", "主视觉标注", "横向条形图", "环图"],
    fakeDataNeeds: [
      "客户品牌与组织信息",
      "产品碳足迹排行数据",
      "组织范围一二三占比",
      "减排项目分类占比",
      "园区主视觉标注点位",
    ],
    organizationReason:
      "保留模板里的分析逻辑，把表达层替换成客户品牌、客户场景和客户叙事，确保案例是从模板派生而不是反向成为母版。",
    derivedFrom: "manufacturing-carbon-overview",
  },
]

export function getDashboardAssets(kind?: DashboardAssetKind) {
  return kind
    ? DASHBOARD_ASSETS.filter((asset) => asset.kind === kind)
    : DASHBOARD_ASSETS
}
