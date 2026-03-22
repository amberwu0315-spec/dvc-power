import { createFileRoute } from "@tanstack/react-router"

import { AssistantV0Page } from "@/features/assistant/assistant-v0-page"

export const Route = createFileRoute("/assistant")({
  component: AssistantPage,
  head: () => ({
    meta: [
      {
        title: "AI 配置助手 V0 | DVS Power",
      },
      {
        name: "description",
        content:
          "以最小输入输出页面结构建议、模块配置建议、缺失信息提醒和执行说明的前置方案助手页面。",
      },
    ],
  }),
})

export function AssistantPage() {
  return <AssistantV0Page />
}
