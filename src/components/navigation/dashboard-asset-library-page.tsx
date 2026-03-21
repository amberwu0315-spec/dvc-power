import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { buttonVariants } from "@/components/ui/button"
import {
  DASHBOARD_ASSET_GROUPS,
  getDashboardAssets,
  type DashboardAssetKind,
} from "@/lib/dashboard-assets"
import { cn } from "@/lib/utils"

export interface DashboardAssetLibraryPageProps {
  kind?: DashboardAssetKind
}

type DashboardAssetGroupEntry = [
  DashboardAssetKind,
  (typeof DASHBOARD_ASSET_GROUPS)[DashboardAssetKind],
]

const dashboardAssetGroupEntries = Object.entries(
  DASHBOARD_ASSET_GROUPS
) as Array<
  [DashboardAssetKind, (typeof DASHBOARD_ASSET_GROUPS)[DashboardAssetKind]]
>

export function DashboardAssetLibraryPage({
  kind,
}: DashboardAssetLibraryPageProps) {
  const groupEntries: DashboardAssetGroupEntry[] = kind
    ? [[kind, DASHBOARD_ASSET_GROUPS[kind]]]
    : dashboardAssetGroupEntries

  return (
    <main className="dark stack-page min-h-svh bg-background text-foreground">
      <div className="mx-auto flex min-h-svh w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <header className="grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.72)] backdrop-blur-xl sm:p-8">
          <Badge
            variant="outline"
            className="w-fit border-cyan-400/30 bg-cyan-400/10 text-cyan-100"
          >
            驾驶舱资产目录
          </Badge>
          <div className="grid gap-3 lg:grid-cols-[minmax(0,1.4fr)_minmax(18rem,0.8fr)] lg:items-end">
            <div className="grid gap-3">
              <h1 className="font-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                模板负责复用，案例负责展示
              </h1>
              <p className="max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">
                先把制造业能碳总览页沉淀为通用模板，再把报喜鸟页明确收口为从模板派生的客户案例。
                后续新增页面时，只需要先判断它属于模板还是案例，再按统一命名和路由规则接入。
              </p>
            </div>
            <div className="grid gap-3 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-slate-300">
              <p className="font-medium text-white">统一规则</p>
              <p>
                <code>templates/&lt;行业或场景 slug&gt;</code> 用于母版沉淀
              </p>
              <p>
                <code>cases/&lt;客户或品牌 slug&gt;</code> 用于客户化展示
              </p>
              <p>案例必须注明来源模板，但不能反向充当模板</p>
            </div>
          </div>
        </header>

        {!kind ? (
          <section className="grid gap-4 lg:grid-cols-2">
            {dashboardAssetGroupEntries.map(([groupKey, group]) => (
              <Card
                key={groupKey}
                className="stack-card border border-white/10 bg-white/5 py-0 text-white"
              >
                <CardHeader className="gap-2 border-b border-white/10 py-5">
                  <Badge
                    variant="outline"
                    className="w-fit border-white/15 bg-white/10 text-slate-200"
                  >
                    {group.title}
                  </Badge>
                  <CardTitle className="text-xl text-white">
                    {group.title}
                  </CardTitle>
                  <CardDescription className="max-w-xl text-slate-300">
                    {group.description}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="border-t border-white/10 py-4">
                  <a
                    href={group.routePath}
                    className={cn(
                      buttonVariants({ variant: "outline", size: "lg" }),
                      "border-white/15 bg-white/5 text-white hover:bg-white/10"
                    )}
                  >
                    查看 {group.title}
                  </a>
                </CardFooter>
              </Card>
            ))}
          </section>
        ) : null}

        <div className="grid gap-6">
          {groupEntries.map(([groupKey, group]) => {
            const assets = getDashboardAssets(groupKey as DashboardAssetKind)

            return (
              <section key={groupKey} className="grid gap-4">
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <div className="grid gap-1">
                    <h2 className="font-heading text-2xl font-semibold text-white">
                      {group.title}
                    </h2>
                    <p className="text-sm text-slate-300">
                      {group.description}
                    </p>
                  </div>
                  {kind ? (
                    <a
                      href="/"
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "lg" }),
                        "text-slate-200 hover:bg-white/10 hover:text-white"
                      )}
                    >
                      返回资产总览
                    </a>
                  ) : null}
                </div>

                <div className="grid gap-4 xl:grid-cols-2">
                  {assets.map((asset) => (
                    <Card
                      key={asset.id}
                      className="stack-card border border-white/10 bg-white/5 py-0 text-white"
                    >
                      <CardHeader className="gap-3 border-b border-white/10 py-5">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge className="bg-cyan-400/15 text-cyan-50">
                            {group.title}
                          </Badge>
                          <Badge
                            variant="outline"
                            className="border-white/15 bg-white/5 text-slate-300"
                          >
                            {asset.slug}
                          </Badge>
                          {asset.derivedFrom ? (
                            <Badge
                              variant="outline"
                              className="border-emerald-400/25 bg-emerald-400/10 text-emerald-100"
                            >
                              派生自 {asset.derivedFrom}
                            </Badge>
                          ) : null}
                        </div>
                        <div className="grid gap-2">
                          <CardTitle className="text-xl text-white">
                            {asset.title}
                          </CardTitle>
                          <CardDescription className="text-slate-300">
                            页面目标：{asset.pageGoal}
                          </CardDescription>
                        </div>
                      </CardHeader>

                      <CardContent className="grid gap-5 py-5 text-sm text-slate-200">
                        <AssetInfoBlock
                          label="模块清单"
                          items={asset.modules}
                        />
                        <AssetInfoBlock
                          label="图表类型"
                          items={asset.chartTypes}
                        />
                        <AssetInfoBlock
                          label="假数据需求"
                          items={asset.fakeDataNeeds}
                        />
                        <div className="grid gap-2">
                          <p className="text-xs font-medium tracking-[0.18em] text-slate-400 uppercase">
                            为什么这样组织
                          </p>
                          <p className="leading-6 text-slate-300">
                            {asset.organizationReason}
                          </p>
                        </div>
                      </CardContent>

                      <CardFooter className="border-t border-white/10 py-4">
                        <a
                          href={asset.routePath}
                          className={cn(
                            buttonVariants({ variant: "outline", size: "lg" }),
                            "border-white/15 bg-white/5 text-white hover:bg-white/10"
                          )}
                        >
                          进入页面
                        </a>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      </div>
    </main>
  )
}

function AssetInfoBlock({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="grid gap-2">
      <p className="text-xs font-medium tracking-[0.18em] text-slate-400 uppercase">
        {label}
      </p>
      <ul className="grid gap-2 text-slate-200">
        {items.map((item) => (
          <li
            key={item}
            className="rounded-2xl border border-white/8 bg-black/15 px-3 py-2 leading-6"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
