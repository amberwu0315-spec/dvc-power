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
      description="底部区承接工厂级关键明细，保留 6 列核心字段，优先服务首页快速对比。"
      contentClassName="space-y-4"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border/50 bg-background/20 px-4 py-3 text-xs text-muted-foreground">
        <span>工厂关键指标对比</span>
        <span>共 {rows.length} 个工厂对象</span>
      </div>

      <div className="overflow-hidden rounded-xl border border-border/50 bg-background/16">
        <Table className="text-sm">
          <TableHeader>
            <TableRow className="border-border/60 hover:bg-transparent">
              <TableHead className="pl-4">工厂</TableHead>
              <TableHead>
                <div className="space-y-0.5">
                  <div>综合能耗</div>
                  <div className="text-[0.68rem] font-normal text-muted-foreground">
                    tce
                  </div>
                </div>
              </TableHead>
              <TableHead>
                <div className="space-y-0.5">
                  <div>总碳排</div>
                  <div className="text-[0.68rem] font-normal text-muted-foreground">
                    tCO2e
                  </div>
                </div>
              </TableHead>
              <TableHead>
                <div className="space-y-0.5">
                  <div>单位产值碳排</div>
                  <div className="text-[0.68rem] font-normal text-muted-foreground">
                    tCO2e/万元
                  </div>
                </div>
              </TableHead>
              <TableHead>
                <div className="space-y-0.5">
                  <div>绿电占比</div>
                  <div className="text-[0.68rem] font-normal text-muted-foreground">
                    %
                  </div>
                </div>
              </TableHead>
              <TableHead className="pr-4">状态</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => {
              const statusMeta = FACTORY_STATUS_META[row.status]

              return (
                <TableRow
                  key={row.id}
                  className="border-border/50 hover:bg-background/26"
                >
                  <TableCell className="pl-4 font-medium text-foreground/92">
                    {row.factoryName}
                  </TableCell>
                  <TableCell>{formatNumber(row.energy)}</TableCell>
                  <TableCell>{formatNumber(row.carbon)}</TableCell>
                  <TableCell>{row.carbonPerOutput.toFixed(2)}</TableCell>
                  <TableCell>{row.greenPowerRatio.toFixed(1)}</TableCell>
                  <TableCell className="pr-4">
                    <Badge
                      variant="outline"
                      className={cn(
                        "border px-2.5 py-1 text-[0.65rem]",
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
