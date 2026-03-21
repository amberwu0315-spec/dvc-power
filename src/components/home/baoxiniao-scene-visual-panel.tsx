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
  markers,
  title,
  subtitle,
  statusItems,
  className,
}: BaoxiniaoSceneVisualPanelProps) {
  return (
    <section
      aria-label="报喜鸟静态园区主视觉"
      className={cn(
        "baoxiniao-scene absolute inset-0 overflow-hidden rounded-[2rem] xl:rounded-[2.5rem]",
        className
      )}
    >
      <div className="baoxiniao-scene-image absolute inset-0" />
      <div className="baoxiniao-scene-grid absolute inset-0" />
      <div className="baoxiniao-scene-glow absolute inset-0" />

      <div className="absolute inset-x-5 top-5 z-10 flex items-start justify-between gap-4 xl:inset-x-7 xl:top-6">
        <div className="max-w-[18rem] rounded-[1.35rem] border border-white/26 bg-white/12 px-4 py-3 text-slate-700 shadow-[0_18px_48px_-36px_rgba(39,61,92,0.34)] backdrop-blur-xl">
          <div className="text-[0.68rem] font-medium tracking-[0.24em] text-slate-500/78 uppercase">
            Scene Core
          </div>
          <div className="mt-2 text-[1rem] font-medium tracking-[0.08em] text-slate-800">
            {title}
          </div>
          <div className="mt-1 text-[0.78rem] leading-5 text-slate-600/82">
            {subtitle}
          </div>
        </div>

        <div className="hidden rounded-full border border-white/24 bg-white/10 px-4 py-2 text-[0.7rem] font-medium tracking-[0.18em] text-slate-600/74 uppercase shadow-[0_16px_40px_-34px_rgba(39,61,92,0.3)] backdrop-blur-xl xl:inline-flex">
          Smart Factory Carbon View
        </div>
      </div>

      {markers.map((marker, index) => (
        <div
          key={`${marker.label}-${index}`}
          className="baoxiniao-scene-marker absolute z-10 hidden xl:flex"
          style={{ top: marker.top, left: marker.left }}
        >
          <span className="baoxiniao-scene-marker-dot" />
          <span className="baoxiniao-scene-marker-line" />
          <span className="baoxiniao-scene-marker-label">{marker.label}</span>
        </div>
      ))}

      <div className="absolute inset-x-5 bottom-5 z-10 xl:inset-x-7 xl:bottom-6">
        <div className="baoxiniao-scene-status">
          {statusItems.map((item) => (
            <div key={item.label} className="baoxiniao-scene-status-item">
              <div className="text-[0.66rem] font-medium tracking-[0.18em] text-slate-500/76 uppercase">
                {item.label}
              </div>
              <div className="mt-1 truncate text-[0.94rem] font-medium text-slate-800">
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
