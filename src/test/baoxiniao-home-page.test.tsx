import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { baoxiniaoHomepageData } from "@/lib/baoxiniao-homepage/data"
import { BaoxiniaoHomePage } from "@/routes/baoxiniao"

describe("BaoxiniaoHomePage", () => {
  it("renders the baoxiniao dashboard headline and filters", () => {
    render(<BaoxiniaoHomePage />)

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: baoxiniaoHomepageData.pageMeta.pageTitle,
      })
    ).toBeDefined()
    expect(
      screen.getAllByText(baoxiniaoHomepageData.pageMeta.organizationName)
        .length
    ).toBeGreaterThan(0)
    expect(
      screen.getByText(baoxiniaoHomepageData.pageMeta.yearLabel)
    ).toBeDefined()
    expect(
      screen.getByText(baoxiniaoHomepageData.pageMeta.weatherLabel)
    ).toBeDefined()
    expect(screen.getByLabelText("报喜鸟 Saint Angelo")).toBeDefined()
  })

  it("renders the baoxiniao visual homepage modules", () => {
    render(<BaoxiniaoHomePage />)

    expect(screen.getByText("组织级综合数据")).toBeDefined()
    expect(screen.getByText("产品碳足迹 top 5 (kgCO₂e)")).toBeDefined()
    expect(screen.getByText("组织碳足迹范围占比")).toBeDefined()
    expect(screen.getByText("减排项目类型占比")).toBeDefined()
    expect(screen.getByLabelText("报喜鸟静态园区主视觉")).toBeDefined()
    expect(screen.getByText("总碳排量")).toBeDefined()
    expect(screen.getByText("碳排水平")).toBeDefined()
    expect(screen.getByText("HAZZYS 碳中和 POLO 衫")).toBeDefined()
    expect(screen.getByText("范围三")).toBeDefined()
    expect(screen.getByText("能源替代")).toBeDefined()
    expect(
      screen.queryByText("组织碳足迹 x 产品足迹 x ESG 成果展示")
    ).toBeNull()
  })
})
