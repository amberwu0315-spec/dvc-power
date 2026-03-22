export type AssistantPageUse = "presentation" | "report" | "monitor"

export type AssistantAvailability = "yes" | "no"

export type AssistantSceneKey =
  | "manufacturing-carbon"
  | "manufacturing-operations"
  | "general-dashboard"

export type AssistantSkeletonKey = "overview-balanced" | "monitor-focused"

export type AssistantModuleKey =
  | "title-region"
  | "filter-region"
  | "kpi-overview"
  | "trend-analysis"
  | "composition-breakdown"
  | "ranking-module"
  | "target-progress"
  | "alert-module"
  | "detail-table"
  | "narrative-note"

export interface AssistantFormState {
  clientIndustry: string
  sceneGoal: string
  pageUse: AssistantPageUse
  hasReference: AssistantAvailability
  hasBrandAssets: AssistantAvailability
  requiredContent: string
}

export interface AssistantRuleCard {
  title: string
  status: "已判断" | "待补充"
  conclusion: string
  description: string
}

export interface AssistantOutputField {
  label: string
  value: string
}

export interface AssistantOutputCard {
  id: "structure" | "modules" | "missing" | "brief"
  title: string
  description: string
  fields: AssistantOutputField[]
  copyLabel: string
  copyValue: string
}

export interface AssistantAssetNotes {
  templateBadge: string
  templateDescription: string
  templateSupportingText: string
  caseBadge: string
  caseDescription: string
  caseSupportingText: string
}

export interface AssistantModuleDefinition {
  moduleKey: AssistantModuleKey
  moduleName: string
  modulePurpose: string
  commonTitles: string[]
  commonDataItems: string[]
  commonChartTypes: string[]
  commonRegions: string[]
  suitableQuestions: string[]
}

export interface AssistantSkeletonDefinition {
  skeletonKey: AssistantSkeletonKey
  conclusion: string
  structure: string
  sequence: string
  reason: string
}

export interface AssistantDraft {
  sceneKey: AssistantSceneKey
  sceneLabel: string
  ruleCards: AssistantRuleCard[]
  outputCards: AssistantOutputCard[]
  assetNotes: AssistantAssetNotes
}
