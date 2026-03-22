import { useState } from "react"

import { ProductShell } from "@/components/navigation/product-shell"
import {
  assistantAvailabilityOptions,
  assistantBoundaryItems,
  assistantFormDefaults,
  assistantPageUseOptions,
} from "@/features/assistant/assistant-config"
import { buildAssistantDraft } from "@/features/assistant/assistant-rules"
import { presetModuleList } from "@/features/assistant/module-library"
import type { AssistantFormState } from "@/features/assistant/types"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DASHBOARD_ASSETS } from "@/lib/dashboard-assets"
import { cn } from "@/lib/utils"

const templateAsset =
  DASHBOARD_ASSETS.find(
    (asset) => asset.slug === "manufacturing-carbon-overview"
  ) ?? null

const caseAsset =
  DASHBOARD_ASSETS.find((asset) => asset.slug === "baoxiniao-carbon-cockpit") ??
  null

export function AssistantV0Page() {
  const [formState, setFormState] = useState(assistantFormDefaults)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [hasGenerated, setHasGenerated] = useState(false)
  const draft = buildAssistantDraft(formState)

  function updateField<Key extends keyof AssistantFormState>(
    field: Key,
    value: AssistantFormState[Key]
  ) {
    setFormState((previous) => ({
      ...previous,
      [field]: value,
    }))
    setHasGenerated(false)
  }

  async function copyText(id: string, value: string) {
    if (typeof navigator === "undefined" || !navigator.clipboard) {
      setCopiedId(null)
      return
    }

    try {
      await navigator.clipboard.writeText(value)
      setCopiedId(id)
    } catch {
      setCopiedId(null)
    }
  }

  return (
    <ProductShell currentNav="assistant">
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(18rem,0.75fr)]">
        <Card className="stack-card border border-white/10 bg-white/5 py-0 text-white">
          <CardHeader className="gap-4 border-b border-white/10 py-6 sm:py-8">
            <Badge
              variant="outline"
              className="w-fit border-cyan-400/30 bg-cyan-400/10 text-cyan-100"
            >
              AI Config Assistant V0
            </Badge>
            <div className="grid gap-3">
              <CardTitle className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                定制化驾驶舱 AI 配置助手 V0
              </CardTitle>
              <CardDescription className="text-base leading-7 text-slate-300">
                把模糊需求整理成可执行的页面草案
              </CardDescription>
              <p className="max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">
                当前版本只聚焦“需求 -&gt;
                页面草案”这一步，先用预置模块库和本地规则映射给出高确定性的骨架与模块建议，再继续交给设计或
                Codex 落地。
              </p>
            </div>
          </CardHeader>
          <CardFooter className="flex flex-wrap gap-3 border-t border-white/10 py-5">
            <Button
              size="lg"
              className="bg-white text-slate-950 hover:bg-slate-100"
              onClick={() => setHasGenerated(true)}
            >
              生成方案草案
            </Button>
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
              className="w-fit border-white/15 bg-white/5 text-slate-300"
            >
              V0 Focus
            </Badge>
            <CardTitle className="text-2xl text-white">
              先把模块和骨架说清，再继续落地
            </CardTitle>
            <CardDescription className="text-sm leading-6 text-slate-300">
              当前已经预置 {presetModuleList.length}{" "}
              类高确定性模块，规则层会优先从模块库里挑选推荐，而不是直接拼固定段落。
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 py-6 text-sm text-slate-300">
            <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
              当前场景归类：{draft.sceneLabel}
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
              规则负责做场景分类、骨架映射、模块推荐和缺失信息检查。
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
              AI 暂不接入；这一轮优先做成“预置模块库 + 本地规则映射”的半真原型。
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4">
        <div className="grid gap-2">
          <Badge
            variant="outline"
            className="w-fit border-white/15 bg-white/5 text-slate-300"
          >
            Input
          </Badge>
          <h2 className="font-heading text-2xl font-semibold text-white">
            先补齐最小输入
          </h2>
          <p className="max-w-3xl text-sm leading-6 text-slate-300">
            当前版本只收集最影响场景归类和模块推荐的关键信息，不拆成多步骤，不做复杂工作台。
          </p>
        </div>

        <Card className="stack-card border border-white/10 bg-white/5 py-0 text-white">
          <CardContent className="grid gap-5 py-6">
            <div className="grid gap-5 lg:grid-cols-2">
              <label className="grid gap-2 text-sm">
                <span className="text-slate-200">客户 / 行业</span>
                <input
                  value={formState.clientIndustry}
                  onChange={(event) =>
                    updateField("clientIndustry", event.target.value)
                  }
                  className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-slate-500"
                />
              </label>
              <label className="grid gap-2 text-sm">
                <span className="text-slate-200">场景目标</span>
                <input
                  value={formState.sceneGoal}
                  onChange={(event) =>
                    updateField("sceneGoal", event.target.value)
                  }
                  className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-slate-500"
                />
              </label>
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
              <label className="grid gap-2 text-sm">
                <span className="text-slate-200">页面用途</span>
                <select
                  value={formState.pageUse}
                  onChange={(event) =>
                    updateField(
                      "pageUse",
                      event.target.value as AssistantFormState["pageUse"]
                    )
                  }
                  className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white"
                >
                  {assistantPageUseOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="grid gap-2 text-sm">
                <span className="text-slate-200">是否有参考图</span>
                <select
                  value={formState.hasReference}
                  onChange={(event) =>
                    updateField(
                      "hasReference",
                      event.target.value as AssistantFormState["hasReference"]
                    )
                  }
                  className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white"
                >
                  {assistantAvailabilityOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="grid gap-2 text-sm">
                <span className="text-slate-200">是否有品牌素材</span>
                <select
                  value={formState.hasBrandAssets}
                  onChange={(event) =>
                    updateField(
                      "hasBrandAssets",
                      event.target.value as AssistantFormState["hasBrandAssets"]
                    )
                  }
                  className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white"
                >
                  {assistantAvailabilityOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="grid gap-2 text-sm">
              <span className="text-slate-200">必须展示的内容（可选）</span>
              <input
                value={formState.requiredContent}
                onChange={(event) =>
                  updateField("requiredContent", event.target.value)
                }
                className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-slate-500"
              />
            </label>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                size="lg"
                className="bg-white text-slate-950 hover:bg-slate-100"
                onClick={() => setHasGenerated(true)}
              >
                生成方案草案
              </Button>
              <span className="text-xs text-slate-400">
                {hasGenerated
                  ? "已按当前输入刷新当前方案草案。"
                  : "当前输入会实时驱动下方的规则判断和输出卡内容。"}
              </span>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4">
        <div className="grid gap-2">
          <Badge
            variant="outline"
            className="w-fit border-white/15 bg-white/5 text-slate-300"
          >
            Rules
          </Badge>
          <h2 className="font-heading text-2xl font-semibold text-white">
            规则判断结果
          </h2>
          <p className="max-w-3xl text-sm leading-6 text-slate-300">
            输入先进入场景归类和骨架映射，再从预置模块库里选推荐模块，不走聊天式推理。
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-4">
          {draft.ruleCards.map((card) => (
            <Card
              key={card.title}
              className="stack-card border border-white/10 bg-white/5 py-0 text-white"
            >
              <CardHeader className="gap-3 border-b border-white/10 py-5">
                <CardAction>
                  <Badge
                    variant="outline"
                    className={cn(
                      "border-white/10 bg-white/5 text-slate-300",
                      card.status === "待补充" &&
                        "border-amber-400/25 bg-amber-400/10 text-amber-100"
                    )}
                  >
                    {card.status}
                  </Badge>
                </CardAction>
                <div className="grid gap-2">
                  <CardTitle className="text-lg text-white">
                    {card.title}
                  </CardTitle>
                  <CardDescription className="text-sm leading-6 text-slate-300">
                    {card.conclusion}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="py-5 text-sm leading-6 text-slate-300">
                {card.description}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-4">
        <div className="grid gap-2">
          <Badge
            variant="outline"
            className="w-fit border-white/15 bg-white/5 text-slate-300"
          >
            Output
          </Badge>
          <h2 className="font-heading text-2xl font-semibold text-white">
            页面草案建议
          </h2>
          <p className="max-w-3xl text-sm leading-6 text-slate-300">
            输出按照“骨架建议 - 模块组合推荐 - 缺失提醒 -
            执行说明”展开，其中模块建议优先来自预置模块库。
          </p>
        </div>

        <div className="grid gap-4 xl:grid-cols-2">
          {draft.outputCards.map((card) => (
            <Card
              key={card.id}
              className="stack-card border border-white/10 bg-white/5 py-0 text-white"
            >
              <CardHeader className="gap-3 border-b border-white/10 py-5">
                <div className="grid gap-2">
                  <CardTitle className="text-xl text-white">
                    {card.title}
                  </CardTitle>
                  <CardDescription className="text-sm leading-6 text-slate-300">
                    {card.description}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="grid gap-4 py-5">
                {card.fields.map((field) => (
                  <div
                    key={field.label}
                    className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3"
                  >
                    <div className="text-[0.7rem] font-medium tracking-[0.16em] text-slate-400 uppercase">
                      {field.label}
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-200">
                      {field.value}
                    </p>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="flex items-center justify-between border-t border-white/10 py-4">
                <button
                  type="button"
                  onClick={() => copyText(card.id, card.copyValue)}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "border-white/15 bg-white/5 text-white hover:bg-white/10"
                  )}
                >
                  {card.copyLabel}
                </button>
                {copiedId === card.id ? (
                  <span className="text-xs text-cyan-200">已复制</span>
                ) : null}
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-4">
        <div className="grid gap-2">
          <Badge
            variant="outline"
            className="w-fit border-white/15 bg-white/5 text-slate-300"
          >
            Assets
          </Badge>
          <h2 className="font-heading text-2xl font-semibold text-white">
            可复用模板与参考案例
          </h2>
          <p className="max-w-3xl text-sm leading-6 text-slate-300">
            模板和案例继续作为支撑资产存在，不会因为新增模块库而被改成 assistant
            首页。
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {templateAsset ? (
            <Card className="stack-card border border-white/10 bg-white/5 py-0 text-white">
              <CardHeader className="gap-3 border-b border-white/10 py-5">
                <Badge className="bg-cyan-400/15 text-cyan-50">
                  {draft.assetNotes.templateBadge}
                </Badge>
                <div className="grid gap-2">
                  <CardTitle className="text-xl text-white">
                    {templateAsset.title}
                  </CardTitle>
                  <CardDescription className="text-sm leading-6 text-slate-300">
                    {draft.assetNotes.templateDescription}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="py-5 text-sm leading-6 text-slate-300">
                {draft.assetNotes.templateSupportingText}
              </CardContent>
              <CardFooter className="border-t border-white/10 py-4">
                <a
                  href={templateAsset.routePath}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "border-white/15 bg-white/5 text-white hover:bg-white/10"
                  )}
                >
                  查看模板
                </a>
              </CardFooter>
            </Card>
          ) : null}

          {caseAsset ? (
            <Card className="stack-card border border-white/10 bg-white/5 py-0 text-white">
              <CardHeader className="gap-3 border-b border-white/10 py-5">
                <Badge className="bg-emerald-400/15 text-emerald-50">
                  {draft.assetNotes.caseBadge}
                </Badge>
                <div className="grid gap-2">
                  <CardTitle className="text-xl text-white">
                    {caseAsset.title}
                  </CardTitle>
                  <CardDescription className="text-sm leading-6 text-slate-300">
                    {draft.assetNotes.caseDescription}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="py-5 text-sm leading-6 text-slate-300">
                {draft.assetNotes.caseSupportingText}
              </CardContent>
              <CardFooter className="border-t border-white/10 py-4">
                <a
                  href={caseAsset.routePath}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "border-white/15 bg-white/5 text-white hover:bg-white/10"
                  )}
                >
                  查看案例
                </a>
              </CardFooter>
            </Card>
          ) : null}
        </div>
      </section>

      <section className="grid gap-4">
        <div className="grid gap-2">
          <Badge
            variant="outline"
            className="w-fit border-white/15 bg-white/5 text-slate-300"
          >
            Boundary
          </Badge>
          <h2 className="font-heading text-2xl font-semibold text-white">
            V0 边界说明
          </h2>
          <p className="max-w-3xl text-sm leading-6 text-slate-300">
            当前版本不是完整平台，也不是最终页面生成器，而是一个基于预置模块库和本地规则映射的前置方案辅助入口。
          </p>
        </div>

        <Card className="stack-card border border-white/10 bg-white/5 py-0 text-white">
          <CardContent className="grid gap-3 py-6 text-sm leading-6 text-slate-300">
            {assistantBoundaryItems.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3"
              >
                {item}
              </div>
            ))}
            <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 text-cyan-50">
              如果要继续落地，可在此基础上进入模板复用、案例参考、设计深化或
              Codex 实现。
            </div>
          </CardContent>
        </Card>
      </section>
    </ProductShell>
  )
}
