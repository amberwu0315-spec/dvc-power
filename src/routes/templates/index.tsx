import { createFileRoute } from "@tanstack/react-router"

import { DashboardAssetLibraryPage } from "@/components/navigation/dashboard-asset-library-page"

export const Route = createFileRoute("/templates/")({
  component: TemplateLibraryPage,
  head: () => ({
    meta: [
      {
        title: "通用模板 | DVS Power",
      },
      {
        name: "description",
        content: "面向行业和场景的通用模板目录，用于沉淀可复用驾驶舱母版。",
      },
    ],
  }),
})

export function TemplateLibraryPage() {
  return <DashboardAssetLibraryPage kind="template" />
}
