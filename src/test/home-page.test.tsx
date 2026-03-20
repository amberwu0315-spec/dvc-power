import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { homepageDashboardData } from "@/lib/homepage/data"
import { HOMEPAGE_COPY } from "@/lib/homepage/constants"
import { HomePage } from "@/routes/index"

describe("HomePage", () => {
  it("renders the manufacturing dashboard shell", () => {
    render(<HomePage />)

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: homepageDashboardData.pageMeta.pageTitle,
      })
    ).toBeDefined()
    expect(screen.getByText(homepageDashboardData.pageMeta.entityName)).toBeDefined()
    expect(screen.getByText(homepageDashboardData.pageMeta.periodLabel)).toBeDefined()
    expect(screen.getByText(homepageDashboardData.pageMeta.updatedAt)).toBeDefined()
  })

  it("renders the homepage skeleton sections", () => {
    render(<HomePage />)

    expect(screen.getByText(HOMEPAGE_COPY.sections.kpiOverview)).toBeDefined()
    expect(screen.getByText(HOMEPAGE_COPY.sections.monthlyTrend)).toBeDefined()
    expect(screen.getByText(HOMEPAGE_COPY.sections.emissionStructure)).toBeDefined()
    expect(screen.getByText(HOMEPAGE_COPY.sections.factoryRanking)).toBeDefined()
    expect(screen.getByText(HOMEPAGE_COPY.sections.goalProgress)).toBeDefined()
    expect(screen.getByText(HOMEPAGE_COPY.sections.warnings)).toBeDefined()
    expect(screen.getByText(HOMEPAGE_COPY.sections.factoryTable)).toBeDefined()

    expect(screen.getByText("综合能耗")).toBeDefined()
    expect(screen.getByText("总碳排")).toBeDefined()
    expect(screen.getByText("单位产值碳排")).toBeDefined()
    expect(screen.getByText("绿电占比")).toBeDefined()
    expect(screen.getByText("统计月份")).toBeDefined()
    expect(screen.getByText("排放构成总览")).toBeDefined()
    expect(screen.getByText("默认排序指标")).toBeDefined()
    expect(screen.getAllByText("一厂").length).toBeGreaterThan(0)
    expect(screen.getAllByText("完成率").length).toBeGreaterThan(0)
    expect(screen.getByText("目标值")).toBeDefined()
    expect(screen.getByText("本周碳排强度高于目标线 8.6%")).toBeDefined()
    expect(screen.getByText("已接入 5 行工厂明细数据")).toBeDefined()
  })
})
