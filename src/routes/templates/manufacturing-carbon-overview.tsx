import { createFileRoute } from "@tanstack/react-router"

import { ManufacturingCarbonOverviewScreen } from "@/features/templates/manufacturing-carbon-overview/screen"
import { manufacturingCarbonOverviewData } from "@/features/templates/manufacturing-carbon-overview/data"

export const Route = createFileRoute(
  "/templates/manufacturing-carbon-overview"
)({
  component: ManufacturingCarbonOverviewTemplatePage,
  head: () => ({
    meta: [
      {
        title: "制造业能碳总览模板 | DVS Power",
      },
      {
        name: "description",
        content:
          "制造业能碳总览型首页通用模板，沉淀可复用骨架、模块与假数据结构。",
      },
    ],
  }),
})

export function ManufacturingCarbonOverviewTemplatePage() {
  return (
    <ManufacturingCarbonOverviewScreen data={manufacturingCarbonOverviewData} />
  )
}
