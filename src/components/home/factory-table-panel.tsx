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
import { FACTORY_STATUS_META, HOMEPAGE_COPY } from "@/lib/homepage/constants"
import type { FactoryTableRow } from "@/lib/homepage/types"
import { cn } from "@/lib/utils"

export interface FactoryTablePanelProps {
  rows: FactoryTableRow[]
}

const statusToneClassName = {
  success:
    "border-emerald-400/30 bg-emerald-500/12 text-emerald-200 hover:bg-emerald-500/18",
  warning:
    "border-amber-400/30 bg-amber-500/12 text-amber-200 hover:bg-amber-500/18",
  danger: "border-rose-400/30 bg-rose-500/12 text-rose-200 hover:bg-rose-500/18",
} as const

export function FactoryTablePanel({ rows }: FactoryTablePanelProps) {
  return (
    <DashboardSectionCard
      title={HOMEPAGE_COPY.sections.factoryTable}
      headerAside={
        <div className="rounded-full border border-border/60 bg-background/24 px-2.5 py-1 text-[0.68rem] text-muted-foreground">
          共 {rows.length} 家工厂
        </div>
      }
      className="min-h-0"
      headerClassName="pb-2.5"
      contentClassName="flex min-h-0 flex-col px-0 py-0"
    >
      <div className="min-h-0 flex-1 overflow-hidden">
        <span className="sr-only">工厂关键指标对比</span>
        <Table className="text-[0.78rem]">
          <TableHeader>
            <TableRow className="border-border/60 hover:bg-transparent">
              <TableHead className="h-9 pl-4">工厂</TableHead>
              <TableHead className="h-9">
                综合能耗
                <span className="ml-1 text-[0.64rem] font-normal text-muted-foreground">
                  tce
                </span>
              </TableHead>
              <TableHead className="h-9">
                总碳排
                <span className="ml-1 text-[0.64rem] font-normal text-muted-foreground">
                  tCO2e
                </span>
              </TableHead>
              <TableHead className="h-9">
                单位产值碳排
                <span className="ml-1 text-[0.64rem] font-normal text-muted-foreground">
                  tCO2e/万元
                </span>
              </TableHead>
              <TableHead className="h-9">
                绿电占比
                <span className="ml-1 text-[0.64rem] font-normal text-muted-foreground">
                  %
                </span>
              </TableHead>
              <TableHead className="h-9 pr-4">状态</TableHead>
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
                  <TableCell className="py-2.5 pl-4 font-medium text-foreground/92">
                    {row.factoryName}
                  </TableCell>
                  <TableCell className="py-2.5">{formatNumber(row.energy)}</TableCell>
                  <TableCell className="py-2.5">{formatNumber(row.carbon)}</TableCell>
                  <TableCell className="py-2.5">
                    {row.carbonPerOutput.toFixed(2)}
                  </TableCell>
                  <TableCell className="py-2.5">
                    {row.greenPowerRatio.toFixed(1)}
                  </TableCell>
                  <TableCell className="py-2.5 pr-4">
                    <Badge
                      variant="outline"
                      className={cn(
                        "border px-2 py-0.5 text-[0.65rem]",
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
