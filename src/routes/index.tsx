import { createFileRoute } from "@tanstack/react-router"

import { DashboardAssetLibraryPage } from "@/components/navigation/dashboard-asset-library-page"

export const Route = createFileRoute("/")({
  component: DashboardAssetLibraryHomePage,
  head: () => ({
    meta: [
      {
        title: "驾驶舱资产目录 | DVS Power",
      },
      {
        name: "description",
        content:
          "统一查看通用模板和具体案例的入口页，明确模板复用与案例派生的组织方式。",
      },
    ],
  }),
})

export function DashboardAssetLibraryHomePage() {
  return <DashboardAssetLibraryPage />
}
