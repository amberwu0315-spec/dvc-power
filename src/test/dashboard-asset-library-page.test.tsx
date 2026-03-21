import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { DashboardAssetLibraryHomePage } from "@/routes/index"

describe("DashboardAssetLibraryHomePage", () => {
  it("renders simplified asset cards without the middle detail blocks", () => {
    render(<DashboardAssetLibraryHomePage />)

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "模板负责复用，案例负责展示",
      })
    ).toBeDefined()
    expect(
      screen.getByRole("heading", { level: 2, name: "通用模板" })
    ).toBeDefined()
    expect(
      screen.getByRole("heading", { level: 2, name: "具体案例" })
    ).toBeDefined()
    expect(screen.getByText("制造业能碳总览模板")).toBeDefined()
    expect(screen.getByText("报喜鸟碳驾驶舱案例")).toBeDefined()
    expect(
      screen.getByText("派生自 manufacturing-carbon-overview")
    ).toBeDefined()
    expect(screen.getAllByText("进入页面")).toHaveLength(2)
    expect(screen.queryByText("查看 通用模板")).toBeNull()
    expect(screen.queryByText("查看 具体案例")).toBeNull()
    expect(screen.queryByText("模块清单")).toBeNull()
    expect(screen.queryByText("图表类型")).toBeNull()
    expect(screen.queryByText("假数据需求")).toBeNull()
    expect(screen.queryByText("为什么这样组织")).toBeNull()
  })
})
