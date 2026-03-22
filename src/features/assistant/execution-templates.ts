import type { AssistantFormState } from "@/features/assistant/types"

export function buildAssistantSummary(
  sceneLabel: string,
  pageUse: AssistantFormState["pageUse"]
) {
  if (pageUse === "monitor") {
    return `面向 ${sceneLabel} 的监控型页面草案，优先突出当前状态、异常提示和对象追踪。`
  }

  if (pageUse === "presentation") {
    return `面向 ${sceneLabel} 的展示型页面草案，优先保证结构稳定、重点集中和后续易于深化。`
  }

  return `面向 ${sceneLabel} 的汇报型页面草案，优先保证结构清晰、叙事明确和可继续执行。`
}

export function buildExecutionFocus(pageUse: AssistantFormState["pageUse"]) {
  if (pageUse === "monitor") {
    return "中心突出当前状态与告警，右侧优先展示对象排行和风险信息，底部补充异常明细和继续追踪信息。"
  }

  return "中心突出整体表现，左侧负责趋势与结构解释，右侧负责排行与目标呈现，底部补充明细信息。"
}

export function buildDefaultAssumptions(formState: AssistantFormState) {
  return [
    formState.hasBrandAssets === "no"
      ? "默认尚未提供完整品牌素材"
      : "默认可引用现有品牌素材",
    formState.hasReference === "no"
      ? "默认先采用稳定总览骨架而不是依赖参考图"
      : "默认可参考现有方向图继续细化表达",
    "默认先使用假数据和本地规则结果推进前置方案",
  ].join("；")
}
