import { createFileRoute } from "@tanstack/react-router"

import { HomePageScreen } from "@/components/home/home-page-screen"
import { homepageDashboardData } from "@/lib/homepage/data"

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      {
        title: "制造业能碳总览首页 | DVS Power",
      },
      {
        name: "description",
        content:
          "制造业能碳总览首页 demo 骨架，包含顶部信息、核心指标、分析区、管理区和底部明细区。",
      },
    ],
  }),
})

export function HomePage() {
  return <HomePageScreen data={homepageDashboardData} />
}
