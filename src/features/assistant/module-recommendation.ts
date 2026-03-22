import { presetModuleLibrary } from "@/features/assistant/module-library"
import type {
  AssistantFormState,
  AssistantModuleDefinition,
  AssistantModuleKey,
  AssistantSceneKey,
} from "@/features/assistant/types"

const baseModules: AssistantModuleKey[] = [
  "title-region",
  "filter-region",
  "kpi-overview",
]

const sceneModuleMap: Record<
  AssistantSceneKey,
  Record<AssistantFormState["pageUse"], AssistantModuleKey[]>
> = {
  "manufacturing-carbon": {
    presentation: [
      ...baseModules,
      "trend-analysis",
      "composition-breakdown",
      "ranking-module",
      "target-progress",
      "detail-table",
      "narrative-note",
    ],
    report: [
      ...baseModules,
      "trend-analysis",
      "composition-breakdown",
      "ranking-module",
      "target-progress",
      "alert-module",
      "detail-table",
      "narrative-note",
    ],
    monitor: [
      ...baseModules,
      "trend-analysis",
      "ranking-module",
      "target-progress",
      "alert-module",
      "detail-table",
      "narrative-note",
    ],
  },
  "manufacturing-operations": {
    presentation: [
      ...baseModules,
      "trend-analysis",
      "composition-breakdown",
      "ranking-module",
      "target-progress",
      "detail-table",
      "narrative-note",
    ],
    report: [
      ...baseModules,
      "trend-analysis",
      "composition-breakdown",
      "ranking-module",
      "target-progress",
      "alert-module",
      "detail-table",
      "narrative-note",
    ],
    monitor: [
      ...baseModules,
      "trend-analysis",
      "ranking-module",
      "alert-module",
      "detail-table",
      "narrative-note",
    ],
  },
  "general-dashboard": {
    presentation: [
      ...baseModules,
      "trend-analysis",
      "composition-breakdown",
      "ranking-module",
      "detail-table",
      "narrative-note",
    ],
    report: [
      ...baseModules,
      "trend-analysis",
      "composition-breakdown",
      "ranking-module",
      "target-progress",
      "detail-table",
      "narrative-note",
    ],
    monitor: [
      ...baseModules,
      "trend-analysis",
      "ranking-module",
      "alert-module",
      "detail-table",
      "narrative-note",
    ],
  },
}

const goalModuleKeywords: Array<{
  keywords: string[]
  moduleKey: AssistantModuleKey
}> = [
  {
    keywords: ["目标", "达成", "对标"],
    moduleKey: "target-progress",
  },
  {
    keywords: ["预警", "风险", "异常", "告警"],
    moduleKey: "alert-module",
  },
  {
    keywords: ["结构", "占比", "构成"],
    moduleKey: "composition-breakdown",
  },
  {
    keywords: ["排行", "排名", "top"],
    moduleKey: "ranking-module",
  },
]

function normalizeText(value: string) {
  return value.trim().toLowerCase()
}

function uniqueModuleKeys(keys: AssistantModuleKey[]) {
  return [...new Set(keys)]
}

export function recommendModuleKeys(
  sceneKey: AssistantSceneKey,
  formState: AssistantFormState
) {
  const baseRecommendation = sceneModuleMap[sceneKey][formState.pageUse]
  const combinedText = normalizeText(
    `${formState.sceneGoal} ${formState.requiredContent}`
  )

  const keywordMatches = goalModuleKeywords
    .filter((entry) =>
      entry.keywords.some((keyword) => combinedText.includes(keyword))
    )
    .map((entry) => entry.moduleKey)

  return uniqueModuleKeys([...baseRecommendation, ...keywordMatches])
}

export function getRecommendedModules(
  sceneKey: AssistantSceneKey,
  formState: AssistantFormState
): AssistantModuleDefinition[] {
  return recommendModuleKeys(sceneKey, formState).map(
    (moduleKey) => presetModuleLibrary[moduleKey]
  )
}
