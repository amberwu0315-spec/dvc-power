import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { ProductHomePage } from "@/routes/index"
import { AssistantPage } from "@/routes/assistant"

describe("ProductHomePage", () => {
  it("renders the new product entry instead of the asset library home", () => {
    render(<ProductHomePage />)

    expect(
      screen.getByText("把驾驶舱前置方案先跑通，再进入模板与案例")
    ).toBeDefined()
    expect(screen.getByText("Assistant / Templates / Cases")).toBeDefined()
    expect(screen.getByRole("link", { name: "进入 /assistant" })).toBeDefined()
    expect(screen.queryByText("驾驶舱资产目录")).toBeNull()
  })
})

describe("AssistantPage", () => {
  it("renders the assistant v0 structure with static rule and output cards", () => {
    render(<AssistantPage />)

    expect(screen.getByText("定制化驾驶舱 AI 配置助手 V0")).toBeDefined()
    expect(screen.getByText("先补齐最小输入")).toBeDefined()
    expect(screen.getByText("规则判断结果")).toBeDefined()
    expect(screen.getByText("页面草案建议")).toBeDefined()
    expect(screen.getByText("页面结构建议")).toBeDefined()
    expect(screen.getByText("模块配置建议")).toBeDefined()
    expect(screen.getByText("信息缺失提醒")).toBeDefined()
    expect(screen.getByText("执行说明输出")).toBeDefined()
    expect(screen.getByText("制造业能碳总览模板")).toBeDefined()
    expect(screen.getByText("报喜鸟碳驾驶舱案例")).toBeDefined()
    expect(screen.getByText("V0 边界说明")).toBeDefined()
  })

  it("updates rule cards and output cards when the input changes", () => {
    render(<AssistantPage />)

    fireEvent.change(screen.getByLabelText("客户 / 行业"), {
      target: { value: "零售集团" },
    })
    fireEvent.change(screen.getByLabelText("场景目标"), {
      target: { value: "监控门店经营状态和异常波动" },
    })
    fireEvent.change(screen.getByLabelText("页面用途"), {
      target: { value: "monitor" },
    })
    fireEvent.change(screen.getByLabelText("是否有参考图"), {
      target: { value: "no" },
    })
    fireEvent.change(screen.getByLabelText("必须展示的内容（可选）"), {
      target: { value: "" },
    })

    expect(screen.getByText("通用驾驶舱监控总览")).toBeDefined()
    expect(screen.getByText("监控型总览页面")).toBeDefined()
    expect(
      screen.getAllByText((content) => content.includes("预警模块")).length
    ).toBeGreaterThan(0)
    expect(
      screen.getAllByText(/参考图、品牌素材、必须展示的内容/).length
    ).toBeGreaterThan(0)
  })
})
