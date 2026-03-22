import { assistantSceneProfiles } from "@/features/assistant/scene-rules"
import type {
  AssistantFormState,
  AssistantSceneKey,
} from "@/features/assistant/types"

const sceneKeywords = {
  manufacturing: ["制造", "工厂", "园区", "车间", "产线", "生产"],
  carbon: ["碳", "能耗", "能碳", "双碳", "排放", "节能", "降碳"],
  operations: ["运营", "设备", "产能", "效率", "产量", "交付", "班次"],
}

function normalizeText(value: string) {
  return value.trim().toLowerCase()
}

function includesAnyKeyword(source: string, keywords: string[]) {
  return keywords.some((keyword) => source.includes(keyword))
}

export function classifyAssistantScene(
  formState: AssistantFormState
): AssistantSceneKey {
  const combinedText = normalizeText(
    `${formState.clientIndustry} ${formState.sceneGoal} ${formState.requiredContent}`
  )

  const isManufacturing = includesAnyKeyword(
    combinedText,
    sceneKeywords.manufacturing
  )
  const isCarbon = includesAnyKeyword(combinedText, sceneKeywords.carbon)
  const isOperations = includesAnyKeyword(
    combinedText,
    sceneKeywords.operations
  )

  if (isManufacturing && isCarbon) {
    return "manufacturing-carbon"
  }

  if (isManufacturing || isOperations) {
    return "manufacturing-operations"
  }

  return "general-dashboard"
}

export function getSceneLabel(
  sceneKey: AssistantSceneKey,
  pageUse: AssistantFormState["pageUse"]
) {
  return assistantSceneProfiles[sceneKey].labelByUse[pageUse]
}
