import { createFileRoute } from "@tanstack/react-router"

import { BaoxiniaoCarbonCockpitScreen } from "@/features/cases/baoxiniao-carbon-cockpit/screen"
import { baoxiniaoCarbonCockpitData } from "@/features/cases/baoxiniao-carbon-cockpit/data"

export const Route = createFileRoute("/cases/baoxiniao-carbon-cockpit")({
  component: BaoxiniaoCarbonCockpitCasePage,
  head: () => ({
    meta: [
      {
        title: "报喜鸟碳驾驶舱案例 | DVS Power",
      },
      {
        name: "description",
        content:
          "基于制造业能碳模板派生的报喜鸟客户案例页，突出品牌化和场景化表达。",
      },
    ],
  }),
})

export function BaoxiniaoCarbonCockpitCasePage() {
  return <BaoxiniaoCarbonCockpitScreen data={baoxiniaoCarbonCockpitData} />
}
