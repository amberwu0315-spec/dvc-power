import { createFileRoute } from "@tanstack/react-router"

import { DashboardAssetLibraryPage } from "@/components/navigation/dashboard-asset-library-page"

export const Route = createFileRoute("/cases/")({
  component: CaseLibraryPage,
  head: () => ({
    meta: [
      {
        title: "具体案例 | DVS Power",
      },
      {
        name: "description",
        content:
          "面向真实客户的驾驶舱案例目录，用于展示模板的品牌化和场景化适配结果。",
      },
    ],
  }),
})

export function CaseLibraryPage() {
  return <DashboardAssetLibraryPage kind="case" />
}
