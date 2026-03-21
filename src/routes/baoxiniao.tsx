import { createFileRoute } from "@tanstack/react-router"

import { BaoxiniaoHomePageScreen } from "@/components/home/baoxiniao-home-page-screen"
import { baoxiniaoHomepageData } from "@/lib/baoxiniao-homepage/data"

export const Route = createFileRoute("/baoxiniao")({
  component: BaoxiniaoHomePage,
  head: () => ({
    meta: [
      {
        title: "报喜鸟全景碳驾驶舱首页 | DVS Power",
      },
      {
        name: "description",
        content:
          "报喜鸟全景碳驾驶舱静态主视觉首页 demo，以园区场景为中心，四周浮层承载组织、产品与减排信息。",
      },
    ],
  }),
})

export function BaoxiniaoHomePage() {
  return <BaoxiniaoHomePageScreen data={baoxiniaoHomepageData} />
}
