import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ProductShell } from "@/components/navigation/product-shell"
import { cn } from "@/lib/utils"

const entryCards = [
  {
    title: "Assistant",
    description:
      "以最小输入生成页面结构建议、模块配置建议、缺失信息提醒和执行说明。",
    href: "/assistant",
    cta: "进入 Assistant",
  },
  {
    title: "Templates",
    description:
      "查看可复用页面母版，当前重点保留制造业能碳总览模板作为通用骨架。",
    href: "/templates",
    cta: "查看通用模板",
  },
  {
    title: "Cases",
    description: "查看真实案例如何承接模板骨架并完成品牌化、场景化表达。",
    href: "/cases",
    cta: "查看案例参考",
  },
] as const

const scopeItems = [
  "聚焦“需求 -> 页面草案”这一段前置流程",
  "保留通用模板与真实案例作为支撑资产",
  "首版采用规则驱动 + AI 输出占位，不接真实 AI 接口",
] as const

const boundaryItems = [
  "不是完整驾驶舱平台",
  "不提供复杂拖拽编辑、组件市场、历史版本管理",
  "不承诺一键生成最终可上线页面",
  "当前只负责帮助用户更快完成前置方案阶段",
] as const

export function ProductEntryPage() {
  return (
    <ProductShell currentNav="assistant">
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(18rem,0.7fr)]">
        <Card className="stack-card border border-white/10 bg-white/5 py-0 text-white">
          <CardHeader className="gap-4 border-b border-white/10 py-6 sm:py-8">
            <Badge
              variant="outline"
              className="w-fit border-cyan-400/30 bg-cyan-400/10 text-cyan-100"
            >
              Product Entry
            </Badge>
            <div className="grid gap-3">
              <CardTitle className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                把驾驶舱前置方案先跑通，再进入模板与案例
              </CardTitle>
              <CardDescription className="max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">
                定制化驾驶舱 AI 配置助手 V0 先帮助你把模糊需求整理成页面草案，
                再把结果落到可复用模板和真实案例参考上。它不是大而全平台，
                而是一个更适合当前阶段的前置方案辅助入口。
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="grid gap-5 py-6 sm:py-7">
            <div className="grid gap-3 text-sm text-slate-300">
              {scopeItems.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3"
                >
                  {item}
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex flex-wrap gap-3 border-t border-white/10 py-5">
            <a
              href="/assistant"
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-white text-slate-950 hover:bg-slate-100"
              )}
            >
              进入 /assistant
            </a>
            <a
              href="/templates"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "border-white/15 bg-white/5 text-white hover:bg-white/10"
              )}
            >
              查看通用模板
            </a>
            <a
              href="/cases"
              className={cn(
                buttonVariants({ variant: "ghost", size: "lg" }),
                "text-slate-200 hover:bg-white/10 hover:text-white"
              )}
            >
              查看案例参考
            </a>
          </CardFooter>
        </Card>

        <Card className="stack-card border border-white/10 bg-white/5 py-0 text-white">
          <CardHeader className="gap-3 border-b border-white/10 py-6">
            <Badge
              variant="outline"
              className="w-fit border-amber-400/30 bg-amber-400/10 text-amber-100"
            >
              V0 Boundary
            </Badge>
            <CardTitle className="text-2xl text-white">
              这轮先把边界收紧
            </CardTitle>
            <CardDescription className="text-sm leading-6 text-slate-300">
              首页不再承担资产库首页职责，而是只负责讲清定位、边界和三层入口。
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 py-6 text-sm text-slate-300">
            {boundaryItems.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3"
              >
                {item}
              </div>
            ))}
          </CardContent>
          <CardFooter className="border-t border-white/10 py-5">
            <Button
              disabled
              variant="outline"
              size="lg"
              className="border-white/15 bg-white/5 text-slate-300"
            >
              真实 AI 接口第二轮再接入
            </Button>
          </CardFooter>
        </Card>
      </section>

      <section className="grid gap-4">
        <div className="grid gap-2">
          <Badge
            variant="outline"
            className="w-fit border-white/15 bg-white/5 text-slate-300"
          >
            Three Layers
          </Badge>
          <h2 className="font-heading text-2xl font-semibold text-white">
            Assistant / Templates / Cases
          </h2>
          <p className="max-w-3xl text-sm leading-6 text-slate-300">
            助手负责前置方案，模板负责复用骨架，案例负责落地表达。三层分工清楚后，
            现有页面就不需要推翻重做，只需要重新组织入口和叙事。
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {entryCards.map((entry) => (
            <Card
              key={entry.title}
              className="stack-card border border-white/10 bg-white/5 py-0 text-white"
            >
              <CardHeader className="gap-3 border-b border-white/10 py-5">
                <Badge className="bg-cyan-400/15 text-cyan-50">
                  {entry.title}
                </Badge>
                <div className="grid gap-2">
                  <CardTitle className="text-xl text-white">
                    {entry.title}
                  </CardTitle>
                  <CardDescription className="text-sm leading-6 text-slate-300">
                    {entry.description}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardFooter className="border-t border-white/10 py-4">
                <a
                  href={entry.href}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "border-white/15 bg-white/5 text-white hover:bg-white/10"
                  )}
                >
                  {entry.cta}
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </ProductShell>
  )
}
