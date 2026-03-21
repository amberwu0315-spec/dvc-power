import type { BaoxiniaoSceneMarker } from "@/lib/baoxiniao-homepage/types"
import { cn } from "@/lib/utils"

export interface BaoxiniaoSceneVisualPanelProps {
  markers: BaoxiniaoSceneMarker[]
  className?: string
}

export function BaoxiniaoSceneVisualPanel({
  markers,
  className,
}: BaoxiniaoSceneVisualPanelProps) {
  void markers

  return (
    <section
      aria-label="报喜鸟静态园区主视觉"
      className={cn(
        "baoxiniao-scene pointer-events-none absolute inset-0 overflow-hidden rounded-[2rem] xl:rounded-[2.6rem]",
        className
      )}
    />
  )
}
