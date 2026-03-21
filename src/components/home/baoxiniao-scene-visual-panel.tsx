import type { BaoxiniaoSceneMarker } from "@/lib/baoxiniao-homepage/types"
import { cn } from "@/lib/utils"

export interface BaoxiniaoSceneStatusItem {
  label: string
  value: string
}

export interface BaoxiniaoSceneVisualPanelProps {
  markers: BaoxiniaoSceneMarker[]
  title: string
  subtitle: string
  statusItems: BaoxiniaoSceneStatusItem[]
  className?: string
}

export function BaoxiniaoSceneVisualPanel({
  markers: _markers,
  title,
  subtitle,
  statusItems,
  className,
}: BaoxiniaoSceneVisualPanelProps) {
  return (
    <section
      aria-label="报喜鸟静态园区主视觉"
      className={cn(
        "baoxiniao-scene absolute inset-0 overflow-hidden rounded-[18px]",
        className
      )}
    >
      <div className="baoxiniao-scene-image absolute inset-0" />
      <div className="baoxiniao-scene-grid absolute inset-0" />
      <div className="baoxiniao-scene-glow absolute inset-0" />

      <div className="absolute inset-x-5 top-5 z-10 flex items-start justify-between gap-4 xl:inset-x-7 xl:top-6">
        <div className="baoxiniao-scene-intro max-w-[18rem] text-slate-700">
          <div className="text-[0.68rem] font-medium tracking-[0.24em] text-slate-500/74 uppercase">
            Scene Core
          </div>
          <div className="mt-2 text-[1rem] font-medium tracking-[0.08em] text-slate-800">
            {title}
          </div>
          <div className="mt-1 text-[0.78rem] leading-5 text-slate-600/82">
            {subtitle}
          </div>
        </div>

        <div className="baoxiniao-scene-chip hidden xl:inline-flex">
          Smart Factory Carbon View
        </div>
      </div>

      <div className="absolute inset-x-5 bottom-5 z-10 xl:inset-x-7 xl:bottom-6">
        <div className="baoxiniao-scene-status">
          {statusItems.map((item) => (
            <div key={item.label} className="baoxiniao-scene-status-item">
              <div className="baoxiniao-scene-status-label">
                {item.label}
              </div>
              <div className="baoxiniao-scene-status-value">
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
