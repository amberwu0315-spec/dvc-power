import type {
  AssistantAvailability,
  AssistantFormState,
  AssistantPageUse,
} from "@/features/assistant/types"

export const assistantFormDefaults: AssistantFormState = {
  clientIndustry: "某制造集团 / 制造业能碳",
  sceneGoal: "输出一版能讲逻辑、可继续落地的总览型首页草案",
  pageUse: "report",
  hasReference: "yes",
  hasBrandAssets: "no",
  requiredContent: "园区或工厂 KPI、月度趋势、排放结构、目标值、预警列表",
}

export const assistantPageUseOptions: Array<{
  value: AssistantPageUse
  label: string
}> = [
  { value: "presentation", label: "展示" },
  { value: "report", label: "展示 / 汇报" },
  { value: "monitor", label: "监控" },
]

export const assistantAvailabilityOptions: Array<{
  value: AssistantAvailability
  label: string
}> = [
  { value: "yes", label: "有" },
  { value: "no", label: "没有" },
]

export const assistantBoundaryItems = [
  "不是完整驾驶舱平台",
  "不提供复杂拖拽编辑、组件市场、历史版本管理",
  "不承诺一键生成最终可上线页面",
  "当前只负责帮助用户更快完成前置方案阶段",
] as const
