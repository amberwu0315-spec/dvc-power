import { createFileRoute } from "@tanstack/react-router"

import { ProductEntryPage } from "@/features/home/product-entry-page"

export const Route = createFileRoute("/")({
  component: ProductHomePage,
  head: () => ({
    meta: [
      {
        title: "定制化驾驶舱 AI 配置助手 V0 | DVS Power",
      },
      {
        name: "description",
        content:
          "产品入口页，说明 AI 配置助手 V0 的定位、边界，以及 assistant / templates / cases 三层入口。",
      },
    ],
  }),
})

export function ProductHomePage() {
  return <ProductEntryPage />
}
