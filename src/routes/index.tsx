import { createFileRoute } from "@tanstack/react-router"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const stackRows = [
  {
    category: "框架",
    technology: "TanStack Start (Router + Nitro)",
    version: "1.166.x",
  },
  {
    category: "运行时",
    technology: "React",
    version: "19.2.x",
  },
  {
    category: "构建",
    technology: "Vite",
    version: "7.3.x",
  },
  {
    category: "语言",
    technology: "TypeScript (strict)",
    version: "5.9.x",
  },
  {
    category: "样式",
    technology: "Tailwind CSS",
    version: "4.2.x",
  },
  {
    category: "UI 组件",
    technology: "shadcn/ui (base-mira)",
    version: "4.1.x",
  },
  {
    category: "无头 UI",
    technology: "@base-ui/react",
    version: "1.3.x",
  },
  {
    category: "测试",
    technology: "Vitest + Testing Library",
    version: "3.2.x / 16.3.x",
  },
  {
    category: "包管理",
    technology: "pnpm",
    version: "10.30.x",
  },
] as const

const scripts = [
  "pnpm dev",
  "pnpm build",
  "pnpm test",
  "pnpm lint",
  "pnpm typecheck",
] as const

export const Route = createFileRoute("/")({ component: HomePage })

export function HomePage() {
  return (
    <main className="stack-page">
      <div className="mx-auto flex min-h-svh w-full max-w-6xl flex-col gap-8 px-5 py-8 sm:px-6 lg:gap-10 lg:px-8 lg:py-12">
        <section className="grid gap-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)]">
          <Card className="stack-card border-border/60">
            <CardHeader className="gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary">TanStack Start</Badge>
                <Badge variant="outline">SPA Mode</Badge>
                <Badge variant="outline">base-mira</Badge>
              </div>
              <CardTitle>
                <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
                  DVS Power
                </h1>
              </CardTitle>
              <CardDescription className="max-w-3xl text-sm/7 sm:text-base/8">
                基于 TanStack Start 构建的全栈 React 应用，已经接入 React
                19、Vite 7、 TypeScript strict、Tailwind CSS v4、shadcn/ui
                base-mira、 @base-ui/react 以及 Vitest 测试基线。
              </CardDescription>
              <CardAction>
                <Badge>Ready</Badge>
              </CardAction>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="stack-chip rounded-lg border border-border/60 p-3">
                  <div className="text-[0.65rem] font-medium tracking-[0.2em] text-muted-foreground uppercase">
                    路由
                  </div>
                  <p className="mt-2 text-sm font-medium text-foreground">
                    TanStack Router
                  </p>
                  <p className="mt-1 text-xs/6 text-muted-foreground">
                    文件路由已就绪，后续在 <code>src/routes</code>{" "}
                    继续扩展即可。
                  </p>
                </div>
                <div className="stack-chip rounded-lg border border-border/60 p-3">
                  <div className="text-[0.65rem] font-medium tracking-[0.2em] text-muted-foreground uppercase">
                    样式
                  </div>
                  <p className="mt-2 text-sm font-medium text-foreground">
                    Tailwind CSS v4
                  </p>
                  <p className="mt-1 text-xs/6 text-muted-foreground">
                    全局样式位于 <code>src/styles.css</code>，沿用 base-mira
                    设计令牌。
                  </p>
                </div>
                <div className="stack-chip rounded-lg border border-border/60 p-3">
                  <div className="text-[0.65rem] font-medium tracking-[0.2em] text-muted-foreground uppercase">
                    测试
                  </div>
                  <p className="mt-2 text-sm font-medium text-foreground">
                    Vitest + RTL
                  </p>
                  <p className="mt-1 text-xs/6 text-muted-foreground">
                    已补充 jsdom 测试环境和首页基线用例，可直接继续写组件测试。
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={() =>
                    window.open(
                      "https://tanstack.com/start/latest/docs/framework/react/quick-start",
                      "_blank",
                      "noopener,noreferrer"
                    )
                  }
                >
                  TanStack Start Docs
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    window.open(
                      "https://ui.shadcn.com/docs/components/base/button",
                      "_blank",
                      "noopener,noreferrer"
                    )
                  }
                >
                  shadcn/ui Docs
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="stack-card border-border/60">
            <CardHeader>
              <CardTitle>开发入口</CardTitle>
              <CardDescription>
                这几个脚本已经能覆盖本地开发、构建验证和基础质量检查。
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {scripts.map((script) => (
                <div
                  key={script}
                  className="stack-chip flex items-center justify-between gap-3 rounded-lg border border-border/60 px-3 py-2"
                >
                  <code>{script}</code>
                  <Badge variant="outline">ready</Badge>
                </div>
              ))}
            </CardContent>
            <CardFooter className="border-t border-border/60 pt-4 text-xs/6 text-muted-foreground">
              推荐从 <code>pnpm dev</code> 开始，后续提交前跑一次
              <code>pnpm test</code> 和 <code>pnpm build</code>。
            </CardFooter>
          </Card>
        </section>

        <Card className="stack-card border-border/60">
          <CardHeader>
            <CardTitle>技术栈</CardTitle>
            <CardDescription>
              按图片里的技术路线完成初始化，并对齐到当前可用版本。
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-28">类别</TableHead>
                  <TableHead>技术</TableHead>
                  <TableHead className="w-36">版本</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stackRows.map((row) => (
                  <TableRow key={row.category}>
                    <TableCell className="font-medium">
                      {row.category}
                    </TableCell>
                    <TableCell className="whitespace-normal text-foreground/88">
                      {row.technology}
                    </TableCell>
                    <TableCell>{row.version}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableCaption>
                当前项目使用 <code>pnpm</code> 管理依赖，并已启用{" "}
                <code>@/</code> 导入别名。
              </TableCaption>
            </Table>

            <Separator />

            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <div className="text-sm font-medium text-foreground">
                  目录约定
                </div>
                <p className="text-sm/7 text-muted-foreground">
                  页面路由放在 <code>src/routes</code>，UI 组件放在
                  <code>src/components/ui</code>，测试初始化放在
                  <code>src/test/setup.ts</code>。
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="text-sm font-medium text-foreground">
                  下一步开发
                </div>
                <p className="text-sm/7 text-muted-foreground">
                  可以直接继续加业务路由、数据请求层和更多 shadcn
                  组件，不需要再补基础设施。
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

export { stackRows }
