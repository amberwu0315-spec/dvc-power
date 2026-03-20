import type { ReactNode } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export interface DashboardSectionCardProps {
  title: string
  description?: string
  children: ReactNode
  className?: string
  variant?: "default" | "judgment" | "list"
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
  variant = "default",
  headerClassName,
  titleClassName,
  descriptionClassName,
  contentClassName,
  headerAside,
}: DashboardSectionCardProps) {
  const headerBaseClassName =
    variant === "list"
      ? "border-b border-border/50 pb-2"
      : variant === "judgment"
        ? "border-b border-border/50 pb-2"
        : "border-b border-border/60 pb-2.5"

  const contentBaseClassName =
    variant === "list"
      ? "flex-1 px-3 py-2.5"
      : variant === "judgment"
        ? "flex-1 px-3 py-2.5"
        : "flex-1 px-3 py-3"

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
          headerBaseClassName,
          headerAside &&
            "grid-cols-[minmax(0,1fr)_auto] items-center gap-x-2.5 gap-y-1",
          headerClassName
        )}
      >
        <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-0.5">
          <CardTitle
            className={cn(
              "text-[0.95rem] leading-none font-medium tracking-[0.04em] text-foreground/92",
              titleClassName
            )}
          >
            {title}
          </CardTitle>
          {description ? (
            <p
              className={cn(
                "min-w-0 text-[0.68rem] leading-4 text-muted-foreground",
                descriptionClassName
              )}
            >
              {description}
            </p>
          ) : null}
        </div>

        {headerAside ? (
          <div className="shrink-0 justify-self-end">{headerAside}</div>
        ) : null}
      </CardHeader>

      <CardContent className={cn(contentBaseClassName, contentClassName)}>
        {children}
      </CardContent>
    </Card>
  )
}
