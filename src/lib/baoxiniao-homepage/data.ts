import type { BaoxiniaoHomepageData } from "@/lib/baoxiniao-homepage/types"

export const baoxiniaoHomepageData: BaoxiniaoHomepageData = {
  pageMeta: {
    pageTitle: "报喜鸟全景碳驾驶舱",
    brandName: "SAINT ANGELO",
    organizationName: "云翼工厂",
    yearLabel: "2025年",
    weatherLabel: "晴 2~8°C",
  },
  overviewKpis: [
    {
      id: "total-carbon",
      label: "总碳排量",
      value: "42,000",
      unit: "tCO2e",
      emphasis: "metric",
    },
    {
      id: "carbon-target",
      label: "总碳排目标",
      value: "60,000",
      unit: "tCO2e",
      emphasis: "metric",
    },
    {
      id: "reduction-total",
      label: "总减排量",
      value: "12,300",
      unit: "tCO2e",
      emphasis: "metric",
    },
    {
      id: "reduction-target",
      label: "总减排目标",
      value: "20,000",
      unit: "tCO2e",
      emphasis: "metric",
    },
    {
      id: "carbon-intensity",
      label: "碳排强度",
      value: "34.80",
      unit: "tCO2e/万件",
      hint: "组织碳排 / 产品件数",
      emphasis: "metric",
    },
    {
      id: "intensity-target",
      label: "目标碳排强度",
      value: "50.00",
      unit: "tCO2e/万件",
      hint: "年度强度目标",
      emphasis: "metric",
    },
    {
      id: "carbon-level",
      label: "碳排水平",
      value: "优秀",
      hint: "较行业平均碳排强度更优",
      emphasis: "status",
    },
  ],
  productFootprintRanking: [
    { name: "HAZZYS 碳中和 POLO 衫", value: 89.22 },
    { name: "定制西服（商务系列）", value: 65.85 },
    { name: "婚庆西服（匠绣工艺款）", value: 60.52 },
    { name: "可运动西服（弹力抗皱款）", value: 52.98 },
    { name: "羊绒纤维衬衣", value: 49.52 },
  ],
  organizationFootprintShare: [
    { category: "范围一", value: 8723, percent: 20.77 },
    { category: "范围二", value: 4297, percent: 10.23 },
    { category: "范围三", value: 28980, percent: 69.0 },
  ],
  projectTypeShare: [
    { category: "能源替代", value: 3913, percent: 39.13 },
    { category: "工艺优化", value: 1087, percent: 10.87 },
    { category: "管理措施", value: 1500, percent: 15.0 },
    { category: "其他", value: 3500, percent: 35.0 },
  ],
  scene: {
    markers: [
      { label: "清洁能源替代", top: "18%", left: "20%" },
      { label: "产品足迹核算", top: "31%", left: "70%" },
      { label: "供应链协同", top: "58%", left: "17%" },
      { label: "ESG 成果披露", top: "68%", left: "68%" },
    ],
  },
}
