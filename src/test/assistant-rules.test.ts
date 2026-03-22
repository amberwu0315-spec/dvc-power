import { describe, expect, it } from "vitest"

import { assistantFormDefaults } from "@/features/assistant/assistant-config"
import { buildAssistantDraft } from "@/features/assistant/assistant-rules"

describe("buildAssistantDraft", () => {
  it("maps manufacturing carbon report inputs to a manufacturing carbon draft", () => {
    const draft = buildAssistantDraft(assistantFormDefaults)

    expect(draft.sceneKey).toBe("manufacturing-carbon")
    expect(draft.sceneLabel).toBe("制造业能碳汇报总览")
    expect(draft.ruleCards[1]?.conclusion).toContain("顶部 + 中部总览")
    expect(draft.outputCards[0]?.fields[0]?.value).toBe("总览型页面")
    expect(draft.outputCards[1]?.fields[0]?.value).toContain("趋势分析模块")
    expect(draft.outputCards[1]?.fields[3]?.value).toContain("折线图")
  })

  it("switches to generic monitoring guidance when the inputs no longer match manufacturing", () => {
    const draft = buildAssistantDraft({
      clientIndustry: "零售集团",
      sceneGoal: "监控门店经营状态和异常波动",
      pageUse: "monitor",
      hasReference: "no",
      hasBrandAssets: "yes",
      requiredContent: "",
    })

    expect(draft.sceneKey).toBe("general-dashboard")
    expect(draft.sceneLabel).toBe("通用驾驶舱监控总览")
    expect(draft.ruleCards[1]?.conclusion).toContain("顶部筛选 + 中部监控总览")
    expect(draft.outputCards[0]?.fields[0]?.value).toBe("监控型总览页面")
    expect(draft.outputCards[1]?.fields[0]?.value).toContain("预警模块")
    expect(draft.outputCards[2]?.fields[1]?.value).toContain("参考图")
    expect(draft.outputCards[2]?.fields[1]?.value).toContain("必须展示的内容")
  })
})
