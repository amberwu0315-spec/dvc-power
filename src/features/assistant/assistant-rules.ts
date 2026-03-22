import {
  buildDefaultAssumptions,
  buildExecutionFocus,
  buildAssistantSummary,
} from "@/features/assistant/execution-templates"
import { presetModuleLibrary } from "@/features/assistant/module-library"
import { getRecommendedModules } from "@/features/assistant/module-recommendation"
import {
  classifyAssistantScene,
  getSceneLabel,
} from "@/features/assistant/scene-classification"
import { assistantSceneProfiles } from "@/features/assistant/scene-rules"
import {
  getPageTypeLabel,
  getSkeletonForPageUse,
} from "@/features/assistant/skeleton-map"
import type {
  AssistantDraft,
  AssistantFormState,
  AssistantOutputCard,
  AssistantOutputField,
  AssistantRuleCard,
} from "@/features/assistant/types"

function getKnownInfo(formState: AssistantFormState, sceneLabel: string) {
  const knownItems = [
    formState.clientIndustry.trim()
      ? `客户 / 行业：${formState.clientIndustry.trim()}`
      : null,
    formState.sceneGoal.trim()
      ? `场景目标：${formState.sceneGoal.trim()}`
      : null,
    `页面用途：${getPageUseLabel(formState.pageUse)}`,
    `场景归类：${sceneLabel}`,
  ].filter(Boolean)

  return knownItems.join("；")
}

function getMissingItems(formState: AssistantFormState) {
  const missingItems: string[] = []

  if (!formState.clientIndustry.trim()) {
    missingItems.push("客户 / 行业")
  }

  if (!formState.sceneGoal.trim()) {
    missingItems.push("场景目标")
  }

  if (formState.hasReference === "no") {
    missingItems.push("参考图")
  }

  if (formState.hasBrandAssets === "no") {
    missingItems.push("品牌素材")
  }

  if (!formState.requiredContent.trim()) {
    missingItems.push("必须展示的内容")
  }

  return missingItems
}

function getFollowUpQuestions(formState: AssistantFormState) {
  const questions: string[] = []

  if (!formState.clientIndustry.trim()) {
    questions.push("当前客户属于哪个行业或业务场景？")
  }

  if (!formState.sceneGoal.trim()) {
    questions.push("当前页面主要要解决什么汇报或展示目标？")
  }

  if (formState.hasReference === "no") {
    questions.push("是否有参考图、过往驾驶舱截图或提案方向可参考？")
  }

  if (formState.hasBrandAssets === "no") {
    questions.push("是否有品牌色、Logo、标题口径或视觉约束？")
  }

  if (!formState.requiredContent.trim()) {
    questions.push("是否必须展示目标值、预警、排行或固定筛选项？")
  }

  if (formState.pageUse === "monitor") {
    questions.push("是否需要把实时状态和异常处理放在更高优先级？")
  }

  if (questions.length === 0) {
    questions.push("是否还需要补充固定筛选项、目标对比口径或展示层品牌要求？")
  }

  return questions
}

function getPageUseLabel(pageUse: AssistantFormState["pageUse"]) {
  switch (pageUse) {
    case "presentation":
      return "展示"
    case "monitor":
      return "监控"
    default:
      return "展示 / 汇报"
  }
}

function buildRuleCards(formState: AssistantFormState): AssistantRuleCard[] {
  const sceneKey = classifyAssistantScene(formState)
  const sceneLabel = getSceneLabel(sceneKey, formState.pageUse)
  const skeleton = getSkeletonForPageUse(formState.pageUse)
  const recommendedModules = getRecommendedModules(sceneKey, formState)
  const missingItems = getMissingItems(formState)

  return [
    {
      title: "场景归类",
      status: "已判断",
      conclusion: sceneLabel,
      description: `结合行业、场景目标和页面用途，当前更适合归类为 ${sceneLabel}。`,
    },
    {
      title: "页面骨架",
      status: "已判断",
      conclusion: skeleton.conclusion,
      description: skeleton.reason,
    },
    {
      title: "推荐模块",
      status: "已判断",
      conclusion: recommendedModules
        .map((module) => module.moduleName)
        .join("、"),
      description: recommendedModules
        .map(
          (module) =>
            `${module.moduleName}用于${module.modulePurpose.replace("。", "")}`
        )
        .slice(0, 3)
        .join("；"),
    },
    {
      title: "缺失信息",
      status: missingItems.length > 0 ? "待补充" : "已判断",
      conclusion:
        missingItems.length > 0
          ? missingItems.join("、")
          : "关键输入已覆盖首版规则判断",
      description:
        missingItems.length > 0
          ? "这些输入会影响表达层、说明文本和执行细节，但不阻塞首版页面草案输出。"
          : "当前输入已覆盖首版关键字段，可以继续细化说明文本和执行建议。",
    },
  ]
}

function buildOutputCards(
  formState: AssistantFormState
): AssistantOutputCard[] {
  const sceneKey = classifyAssistantScene(formState)
  const sceneLabel = getSceneLabel(sceneKey, formState.pageUse)
  const skeleton = getSkeletonForPageUse(formState.pageUse)
  const recommendedModules = getRecommendedModules(sceneKey, formState)
  const missingItems = getMissingItems(formState)
  const followUpQuestions = getFollowUpQuestions(formState)
  const knownInfo = getKnownInfo(formState, sceneLabel)
  const commonDataItems = [
    ...new Set(recommendedModules.flatMap((module) => module.commonDataItems)),
  ]
  const commonChartTypes = [
    ...new Set(recommendedModules.flatMap((module) => module.commonChartTypes)),
  ]
  const suitableQuestions = [
    ...new Set(
      recommendedModules.flatMap((module) => module.suitableQuestions)
    ),
  ]

  const structureFields: AssistantOutputField[] = [
    {
      label: "推荐页面类型",
      value: getPageTypeLabel(formState.pageUse),
    },
    {
      label: "页面骨架",
      value: skeleton.structure,
    },
    {
      label: "区块顺序",
      value: skeleton.sequence,
    },
    {
      label: "组织理由",
      value: skeleton.reason,
    },
  ]

  const moduleFields: AssistantOutputField[] = [
    {
      label: "推荐模块清单",
      value: recommendedModules.map((module) => module.moduleName).join("、"),
    },
    {
      label: "模块目的摘要",
      value: recommendedModules
        .map((module) => `${module.moduleName}：${module.modulePurpose}`)
        .join("；"),
    },
    {
      label: "常见数据项",
      value: commonDataItems.join("、"),
    },
    {
      label: "常见图表类型",
      value: commonChartTypes.join("、"),
    },
    {
      label: "适合回答的问题",
      value: suitableQuestions.join("；"),
    },
  ]

  const missingFields: AssistantOutputField[] = [
    {
      label: "当前已知信息",
      value: knownInfo,
    },
    {
      label: "当前缺失信息",
      value:
        missingItems.length > 0
          ? missingItems.join("、")
          : "当前输入已经覆盖首版关键字段，可继续细化品牌表达和执行细节。",
    },
    {
      label: "建议补充问题",
      value: followUpQuestions.join("；"),
    },
  ]

  const executionText = `请基于当前输入完成一版${sceneLabel}页面草案。${buildExecutionFocus(formState.pageUse)}`
  const briefFields: AssistantOutputField[] = [
    {
      label: "方案摘要",
      value: buildAssistantSummary(sceneLabel, formState.pageUse),
    },
    {
      label: "执行说明文本",
      value: executionText,
    },
    {
      label: "默认假设",
      value: buildDefaultAssumptions(formState),
    },
  ]

  return [
    {
      id: "structure",
      title: "页面结构建议",
      description: "基于场景归类和骨架映射生成，当前会随输入实时更新。",
      fields: structureFields,
      copyLabel: "复制结构说明",
      copyValue: structureFields
        .map((field) => `${field.label}：${field.value}`)
        .join("\n"),
    },
    {
      id: "modules",
      title: "模块配置建议",
      description: "优先从预置模块库中选择推荐模块，而不是直接拼接固定文案。",
      fields: moduleFields,
      copyLabel: "复制模块说明",
      copyValue: moduleFields
        .map((field) => `${field.label}：${field.value}`)
        .join("\n"),
    },
    {
      id: "missing",
      title: "信息缺失提醒",
      description: "根据输入缺口生成的补充提醒和追问建议。",
      fields: missingFields,
      copyLabel: "复制补充问题",
      copyValue: missingFields
        .map((field) => `${field.label}：${field.value}`)
        .join("\n"),
    },
    {
      id: "brief",
      title: "执行说明输出",
      description:
        "把骨架建议、模块清单和缺失信息整理成可继续交给设计或 Codex 的说明文本。",
      fields: briefFields,
      copyLabel: "复制给设计 / Codex",
      copyValue: briefFields
        .map((field) => `${field.label}：${field.value}`)
        .join("\n"),
    },
  ]
}

export function buildAssistantDraft(
  formState: AssistantFormState
): AssistantDraft {
  const sceneKey = classifyAssistantScene(formState)
  const sceneProfile = assistantSceneProfiles[sceneKey]

  return {
    sceneKey,
    sceneLabel: getSceneLabel(sceneKey, formState.pageUse),
    ruleCards: buildRuleCards(formState),
    outputCards: buildOutputCards(formState),
    assetNotes: {
      templateBadge: sceneProfile.templateBadge,
      templateDescription: sceneProfile.templateDescription,
      templateSupportingText: sceneProfile.templateSupportingText,
      caseBadge: sceneProfile.caseBadge,
      caseDescription: sceneProfile.caseDescription,
      caseSupportingText: sceneProfile.caseSupportingText,
    },
  }
}

export function getModuleLibraryPreview() {
  return [
    presetModuleLibrary["title-region"],
    presetModuleLibrary["filter-region"],
    presetModuleLibrary["kpi-overview"],
    presetModuleLibrary["trend-analysis"],
  ]
}
