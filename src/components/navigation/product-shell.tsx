import type { ReactNode } from "react"

import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type ProductNavKey = "assistant" | "templates" | "cases"

const productNavItems: Array<{
  key: ProductNavKey
  label: string
  href: string
}> = [
  {
    key: "assistant",
    label: "Assistant",
    href: "/assistant",
  },
  {
    key: "templates",
    label: "Templates",
    href: "/templates",
  },
  {
    key: "cases",
    label: "Cases",
    href: "/cases",
  },
]

export interface ProductShellProps {
  children: ReactNode
  currentNav?: ProductNavKey
}

export function ProductShell({ children, currentNav }: ProductShellProps) {
  return (
    <main className="dark stack-page min-h-svh bg-background text-foreground">
      <div className="mx-auto flex min-h-svh w-full max-w-7xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8">
        <header className="rounded-3xl border border-white/10 bg-black/20 px-5 py-4 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.72)] backdrop-blur-xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="grid gap-2">
              <a
                href="/"
                className="w-fit text-sm font-semibold tracking-[0.2em] text-slate-100 uppercase"
              >
                DVC Power
              </a>
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
                <Badge
                  variant="outline"
                  className="border-cyan-400/30 bg-cyan-400/10 text-cyan-100"
                >
                  AI Config Assistant V0
                </Badge>
                <span>需求到页面草案</span>
              </div>
            </div>

            <nav className="flex flex-wrap items-center gap-2">
              {productNavItems.map((item) => {
                const isActive = currentNav === item.key

                return (
                  <a
                    key={item.key}
                    href={item.href}
                    className={cn(
                      buttonVariants({
                        variant: isActive ? "default" : "ghost",
                        size: "lg",
                      }),
                      isActive
                        ? "bg-white text-slate-950 hover:bg-slate-100"
                        : "text-slate-200 hover:bg-white/10 hover:text-white"
                    )}
                  >
                    {item.label}
                  </a>
                )
              })}
            </nav>
          </div>
        </header>

        {children}
      </div>
    </main>
  )
}
