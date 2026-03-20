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

    expect(screen.getByText("已接入 12 个月趋势数据")).toBeDefined()
    expect(screen.getByText("当前完成率 81.9%")).toBeDefined()
    expect(screen.getByText("已接入 5 行工厂明细数据")).toBeDefined()
  })
})
