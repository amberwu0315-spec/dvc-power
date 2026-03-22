import type {
  AssistantFormState,
  AssistantSceneKey,
} from "@/features/assistant/types"

export const assistantSceneProfiles: Record<
  AssistantSceneKey,
  {
    labelByUse: Record<AssistantFormState["pageUse"], string>
    templateBadge: string
    templateDescription: string
    templateSupportingText: string
    caseBadge: string
    caseDescription: string
    caseSupportingText: string
  }
> = {
  "manufacturing-carbon": {
    labelByUse: {
      presentation: "制造业能碳展示总览",
      report: "制造业能碳汇报总览",
      monitor: "制造业能碳监控总览",
    },
    templateBadge: "高匹配模板",
    templateDescription:
      "制造业能碳总览模板可直接承接当前方案，是最接近的通用母版。",
    templateSupportingText:
      "建议优先复用制造业能碳总览模板的页面骨架和模块组织方式。",
    caseBadge: "高相关案例",
    caseDescription:
      "报喜鸟案例可作为品牌化和客户化表达参考，帮助理解模板如何转成真实案例页面。",
    caseSupportingText:
      "如果后续要补品牌表达和场景叙事，可参考报喜鸟案例的表达层组织方式。",
  },
  "manufacturing-operations": {
    labelByUse: {
      presentation: "制造业运营展示总览",
      report: "制造业运营汇报总览",
      monitor: "制造业运营监控总览",
    },
    templateBadge: "骨架可复用",
    templateDescription:
      "当前没有完全匹配的运营模板，可先参考制造业能碳总览模板的骨架组织方式。",
    templateSupportingText:
      "建议先复用现有制造业模板的版式骨架，再按运营场景替换模块内容。",
    caseBadge: "表达可参考",
    caseDescription:
      "报喜鸟案例可帮助理解模板如何被客户化，但当前模块内容仍需按运营场景重组。",
    caseSupportingText:
      "后续若要补客户化表达，可参考报喜鸟案例的品牌化方式，而不是直接复用其模块内容。",
  },
  "general-dashboard": {
    labelByUse: {
      presentation: "通用驾驶舱展示总览",
      report: "通用驾驶舱汇报总览",
      monitor: "通用驾驶舱监控总览",
    },
    templateBadge: "骨架参考",
    templateDescription:
      "当前没有完全匹配的通用模板，可先参考制造业能碳总览模板的版式骨架组织方式。",
    templateSupportingText:
      "建议先借用现有模板的总览型骨架，再按具体行业和场景替换模块内容。",
    caseBadge: "案例参考",
    caseDescription:
      "报喜鸟案例可以作为表达层参考，但当前方案还需要继续补行业和模块细节。",
    caseSupportingText:
      "当前更适合把案例当作客户化表达参考，而不是直接当作模块方案来源。",
  },
}
