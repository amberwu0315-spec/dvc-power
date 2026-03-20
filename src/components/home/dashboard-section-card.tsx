import type { ReactNode } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export interface DashboardSectionCardProps {
  title: string
  description?: string
  children: ReactNode
  className?: string
  contentClassName?: string
}

export function DashboardSectionCard({
  title,
  description,
  children,
  className,
  contentClassName,
}: DashboardSectionCardProps) {
  return (
    <Card
      className={cn(
        "stack-card border border-border/60 bg-card/88 text-card-foreground shadow-2xl shadow-black/20",
        className
      )}
      size="sm"
    >
      <CardHeader className="border-b border-border/60 pb-3">
        <CardTitle className="text-sm font-medium tracking-[0.04em] text-foreground/92">
          {title}
        </CardTitle>
        {description ? (
          <p className="text-xs/6 text-muted-foreground">{description}</p>
        ) : null}
      </CardHeader>

      <CardContent className={cn("flex-1 px-4 py-4", contentClassName)}>
        {children}
      </CardContent>
    </Card>
  )
}
