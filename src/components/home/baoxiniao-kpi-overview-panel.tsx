import type { BaoxiniaoKpiItem } from "@/lib/baoxiniao-homepage/types"
import { cn } from "@/lib/utils"

export interface BaoxiniaoKpiOverviewPanelProps {
  metrics: BaoxiniaoKpiItem[]
}

export function BaoxiniaoKpiOverviewPanel({
  metrics,
}: BaoxiniaoKpiOverviewPanelProps) {
  const statusMetric = metrics.find((metric) => metric.emphasis === "status")
  const numericMetrics = metrics.filter(
    (metric) => metric.id !== statusMetric?.id
  )
  const heroMetrics = numericMetrics.slice(0, 2)
  const supportMetrics = numericMetrics.slice(2)

  return (
    <section className="baoxiniao-float-card baoxiniao-kpi-board rounded-[1.95rem] px-4 py-4 sm:px-5 sm:py-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-[0.72rem] font-medium tracking-[0.3em] text-slate-500/86 uppercase">
            Overview
          </div>
          <h2 className="mt-2 text-[1.16rem] font-medium tracking-[0.04em] text-slate-900">
            组织级综合数据
          </h2>
        </div>
        <span className="inline-flex items-center rounded-full border border-white/34 bg-white/18 px-3 py-1 text-[0.72rem] tracking-[0.16em] text-slate-600/86 uppercase backdrop-blur-md">
          企业总览
        </span>
      </div>

      <div className="mt-4.5 flex flex-wrap gap-x-7 gap-y-4">
        {heroMetrics.map((metric, index) => (
          <article
            key={metric.id}
            className={cn(
              "min-w-[13rem] flex-1 space-y-2",
              index === 1 && "sm:max-w-[15rem]"
            )}
          >
            <div className="text-[0.94rem] font-medium text-slate-700/92">
              {metric.label}
            </div>
            <div className="flex flex-wrap items-end gap-2">
              <div className="text-[2.45rem] leading-none font-semibold tracking-[-0.04em] text-teal-600">
                {metric.value}
              </div>
              {metric.unit ? (
                <div className="pb-1 text-[0.92rem] text-slate-600/78">
                  {metric.unit}
                </div>
              ) : null}
            </div>
            {metric.hint ? (
              <div className="text-[0.78rem] text-slate-500/84">{metric.hint}</div>
            ) : null}
          </article>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-x-7 gap-y-3.5 border-t border-white/34 pt-4">
        {supportMetrics.map((metric, index) => (
          <article
            key={metric.id}
            className={cn(
              "min-w-[10rem] flex-1 space-y-1.5",
              index === 0 && "sm:max-w-[12rem]",
              index === 1 && "sm:max-w-[13rem]",
              index > 1 && "sm:max-w-[11rem]"
            )}
          >
            <div className="text-[0.82rem] font-medium text-slate-500/88">
              {metric.label}
            </div>
            <div className="flex flex-wrap items-end gap-1.5">
              <div className="text-[1.52rem] leading-none font-semibold tracking-tight text-slate-800">
                {metric.value}
              </div>
              {metric.unit ? (
                <div className="pb-0.5 text-[0.82rem] text-slate-600/74">
                  {metric.unit}
                </div>
              ) : null}
            </div>
            {metric.hint ? (
              <div className="text-[0.74rem] text-slate-500/78">{metric.hint}</div>
            ) : null}
          </article>
        ))}
      </div>

      {statusMetric ? (
        <article className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-white/26 pt-4">
          <div className="space-y-1.5">
            <div className="text-[0.84rem] font-medium text-slate-500/88">
              {statusMetric.label}
            </div>
            {statusMetric.hint ? (
              <div className="text-[0.8rem] text-slate-500/76">
                {statusMetric.hint}
              </div>
            ) : null}
          </div>

          <div className="inline-flex items-center rounded-full border border-emerald-300/38 bg-emerald-300/10 px-4 py-1.5 text-[1.12rem] font-semibold tracking-[0.08em] text-emerald-600 shadow-[0_20px_38px_-30px_rgba(16,185,129,0.62)] backdrop-blur-md">
            {statusMetric.value}
          </div>
        </article>
      ) : null}
    </section>
  )
}
