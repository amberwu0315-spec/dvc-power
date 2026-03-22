import type {
  AssistantFormState,
  AssistantPageUse,
  AssistantSkeletonDefinition,
} from "@/features/assistant/types"

export const assistantSkeletonMap: Record<
  "overview-balanced" | "monitor-focused",
  AssistantSkeletonDefinition
> = {
  "overview-balanced": {
    skeletonKey: "overview-balanced",
    conclusion: "顶部 + 中部总览 + 左右拆解 + 底部补充",
    structure:
      "顶部标题区 / 左侧趋势结构区 / 中间总览区 / 右侧排行目标区 / 底部明细区",
    sequence: "总览 -> 趋势 -> 结构 -> 排名 -> 目标 -> 预警 -> 明细",
    reason:
      "优先讲整体表现，再拆解趋势、结构、排行、目标和明细，更适合汇报和方向确认阶段。",
  },
  "monitor-focused": {
    skeletonKey: "monitor-focused",
    conclusion: "顶部筛选 + 中部监控总览 + 两侧告警分析 + 底部异常明细",
    structure:
      "顶部标题区 / 左侧趋势分析区 / 中间监控总览区 / 右侧预警排行区 / 底部异常明细区",
    sequence: "监控总览 -> 预警 -> 趋势 -> 排名 -> 异常明细",
    reason:
      "先看当前状态和异常，再补趋势与对象排行，更适合监控型页面的快速决策场景。",
  },
}

export function getSkeletonForPageUse(pageUse: AssistantPageUse) {
  return pageUse === "monitor"
    ? assistantSkeletonMap["monitor-focused"]
    : assistantSkeletonMap["overview-balanced"]
}

export function getPageTypeLabel(pageUse: AssistantFormState["pageUse"]) {
  return pageUse === "monitor" ? "监控型总览页面" : "总览型页面"
}
