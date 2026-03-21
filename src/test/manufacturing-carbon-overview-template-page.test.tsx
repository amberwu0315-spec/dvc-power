import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { HOMEPAGE_COPY } from "@/features/templates/manufacturing-carbon-overview/constants"
import { manufacturingCarbonOverviewData } from "@/features/templates/manufacturing-carbon-overview/data"
import { ManufacturingCarbonOverviewTemplatePage } from "@/routes/templates/manufacturing-carbon-overview"

describe("ManufacturingCarbonOverviewTemplatePage", () => {
  it("renders the manufacturing dashboard shell", () => {
    render(<ManufacturingCarbonOverviewTemplatePage />)

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: manufacturingCarbonOverviewData.pageMeta.pageTitle,
      })
    ).toBeDefined()
    expect(
      screen.getByText(manufacturingCarbonOverviewData.pageMeta.entityName)
    ).toBeDefined()
    expect(
      screen.getByText(manufacturingCarbonOverviewData.pageMeta.periodLabel)
    ).toBeDefined()
    expect(
      screen.getByText(manufacturingCarbonOverviewData.pageMeta.updatedAt)
    ).toBeDefined()
  })

  it("renders the homepage skeleton sections", () => {
    render(<ManufacturingCarbonOverviewTemplatePage />)

    expect(screen.getByText(HOMEPAGE_COPY.sections.kpiOverview)).toBeDefined()
    expect(screen.getByText(HOMEPAGE_COPY.sections.monthlyTrend)).toBeDefined()
    expect(
      screen.getByText(HOMEPAGE_COPY.sections.emissionStructure)
    ).toBeDefined()
    expect(
      screen.getByText(HOMEPAGE_COPY.sections.factoryRanking)
    ).toBeDefined()
    expect(screen.getByText(HOMEPAGE_COPY.sections.goalProgress)).toBeDefined()
    expect(screen.getByText(HOMEPAGE_COPY.sections.warnings)).toBeDefined()
    expect(screen.getByText(HOMEPAGE_COPY.sections.factoryTable)).toBeDefined()

    expect(screen.getAllByText("综合能耗").length).toBeGreaterThan(0)
    expect(screen.getAllByText("总碳排").length).toBeGreaterThan(0)
    expect(screen.getAllByText("单位产值碳排").length).toBeGreaterThan(0)
    expect(screen.getAllByText("绿电占比").length).toBeGreaterThan(0)
    expect(screen.getByText("统计月份")).toBeDefined()
    expect(screen.getByText("排放构成总览")).toBeDefined()
    expect(screen.getByText("按总碳排由高到低")).toBeDefined()
    expect(screen.getAllByText("一厂").length).toBeGreaterThan(0)
    expect(screen.getByText("年度完成率")).toBeDefined()
    expect(screen.getByText("目标值")).toBeDefined()
    expect(screen.getByText("本周碳排强度高于目标线 8.6%")).toBeDefined()
    expect(screen.getByText("工厂关键指标对比")).toBeDefined()
    expect(screen.getByText("制造业能碳驾驶舱")).toBeDefined()
    expect(screen.getByText("园区 / 集团能碳总览")).toBeDefined()
    expect(screen.getAllByText("正常").length).toBeGreaterThan(0)
    expect(screen.getAllByText("预警").length).toBeGreaterThan(0)
  })
})
