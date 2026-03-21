import type { EmissionStructureItem } from "@/features/templates/manufacturing-carbon-overview/types"

export interface BaoxiniaoHomepageMeta {
  pageTitle: string
  brandName: string
  organizationName: string
  yearLabel: string
  weatherLabel: string
}

export interface BaoxiniaoKpiItem {
  id: string
  label: string
  value: string
  unit?: string
  hint?: string
  emphasis?: "metric" | "status"
}

export interface BaoxiniaoRankingItem {
  name: string
  value: number
}

export interface BaoxiniaoSceneMarker {
  label: string
  top: string
  left: string
}

export interface BaoxiniaoHomepageData {
  pageMeta: BaoxiniaoHomepageMeta
  overviewKpis: BaoxiniaoKpiItem[]
  productFootprintRanking: BaoxiniaoRankingItem[]
  organizationFootprintShare: EmissionStructureItem[]
  projectTypeShare: EmissionStructureItem[]
  scene: {
    markers: BaoxiniaoSceneMarker[]
  }
}
