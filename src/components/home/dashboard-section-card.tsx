import type { ReactNode } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export interface DashboardSectionCardProps {
  title: string
  description?: string
  children: ReactNode
  className?: string
  headerClassName?: string
  titleClassName?: string
  descriptionClassName?: string
  contentClassName?: string
  headerAside?: ReactNode
}

export function DashboardSectionCard({
  title,
  description,
  children,
  className,
  headerClassName,
  titleClassName,
  descriptionClassName,
  contentClassName,
  headerAside,
}: DashboardSectionCardProps) {
  return (
    <Card
      className={cn(
        "stack-card border border-border/60 bg-card/88 text-card-foreground shadow-2xl shadow-black/20",
        className
      )}
      size="sm"
    >
      <CardHeader
        className={cn(
          "border-b border-border/60 pb-3",
          headerAside && "gap-3 md:flex-row md:items-center md:justify-between",
          headerClassName
        )}
      >
        <div className="min-w-0 space-y-1">
          <CardTitle
            className={cn(
              "text-sm font-medium tracking-[0.04em] text-foreground/92",
              titleClassName
            )}
          >
            {title}
          </CardTitle>
          {description ? (
            <p className={cn("text-xs/6 text-muted-foreground", descriptionClassName)}>
              {description}
            </p>
          ) : null}
        </div>

        {headerAside ? <div className="shrink-0">{headerAside}</div> : null}
      </CardHeader>

      <CardContent className={cn("flex-1 px-4 py-4", contentClassName)}>
        {children}
      </CardContent>
    </Card>
  )
}
