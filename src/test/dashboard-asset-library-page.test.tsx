import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { DashboardAssetLibraryHomePage } from "@/routes/index"

describe("DashboardAssetLibraryHomePage", () => {
  it("renders template and case groups in the unified entry page", () => {
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
    expect(screen.getByText("查看 通用模板")).toBeDefined()
    expect(screen.getByText("查看 具体案例")).toBeDefined()
  })
})
