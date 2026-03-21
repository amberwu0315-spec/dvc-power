import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DashboardSectionCard } from "@/components/home/dashboard-section-card"
import {
  FACTORY_STATUS_META,
  HOMEPAGE_COPY,
} from "@/features/templates/manufacturing-carbon-overview/constants"
import type { FactoryTableRow } from "@/features/templates/manufacturing-carbon-overview/types"
import { cn } from "@/lib/utils"

export interface FactoryTablePanelProps {
  rows: FactoryTableRow[]
}

const statusToneClassName = {
  success:
    "border-emerald-400/30 bg-emerald-500/12 text-emerald-200 hover:bg-emerald-500/18",
  warning:
    "border-amber-400/30 bg-amber-500/12 text-amber-200 hover:bg-amber-500/18",
  danger:
    "border-rose-400/30 bg-rose-500/12 text-rose-200 hover:bg-rose-500/18",
} as const

export function FactoryTablePanel({ rows }: FactoryTablePanelProps) {
  return (
    <DashboardSectionCard
      title={HOMEPAGE_COPY.sections.factoryTable}
      headerAside={
        <div className="inline-flex items-center rounded-full border border-border/60 bg-background/24 px-2 py-0.5 text-[0.64rem] leading-4 text-muted-foreground">
          共 {rows.length} 家工厂
        </div>
      }
      className="min-h-0"
      contentClassName="flex min-h-0 flex-col px-0 py-0"
    >
      <div className="min-h-0 flex-1">
        <span className="sr-only">工厂关键指标对比</span>
        <Table className="text-[0.74rem]">
          <TableHeader>
            <TableRow className="border-border/60 hover:bg-transparent">
              <TableHead className="h-8 pl-3.5">工厂</TableHead>
              <TableHead className="h-8">
                综合能耗
                <span className="ml-1 text-[0.58rem] font-normal text-muted-foreground">
                  tce
                </span>
              </TableHead>
              <TableHead className="h-8">
                总碳排
                <span className="ml-1 text-[0.58rem] font-normal text-muted-foreground">
                  tCO2e
                </span>
              </TableHead>
              <TableHead className="h-8">
                单位产值碳排
                <span className="ml-1 text-[0.58rem] font-normal text-muted-foreground">
                  tCO2e/万元
                </span>
              </TableHead>
              <TableHead className="h-8">
                绿电占比
                <span className="ml-1 text-[0.58rem] font-normal text-muted-foreground">
                  %
                </span>
              </TableHead>
              <TableHead className="h-8 pr-3.5">状态</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.slice(0, 5).map((row) => {
              const statusMeta = FACTORY_STATUS_META[row.status]

              return (
                <TableRow
                  key={row.id}
                  className="border-border/50 hover:bg-background/26"
                >
                  <TableCell className="py-2 pl-3.5 font-medium text-foreground/92">
                    {row.factoryName}
                  </TableCell>
                  <TableCell className="py-2">
                    {formatNumber(row.energy)}
                  </TableCell>
                  <TableCell className="py-2">
                    {formatNumber(row.carbon)}
                  </TableCell>
                  <TableCell className="py-2">
                    {row.carbonPerOutput.toFixed(2)}
                  </TableCell>
                  <TableCell className="py-2">
                    {row.greenPowerRatio.toFixed(1)}
                  </TableCell>
                  <TableCell className="py-2 pr-3.5">
                    <Badge
                      variant="outline"
                      className={cn(
                        "border px-1.5 py-0 text-[0.6rem]",
                        statusToneClassName[statusMeta.tone]
                      )}
                    >
                      {statusMeta.label}
                    </Badge>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </DashboardSectionCard>
  )
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("zh-CN", {
    maximumFractionDigits: 0,
  }).format(value)
}
