# 驾驶舱页面资产组织规则

## 1. 当前定位

### 1.1 通用模板

- `制造业能碳页面` 的定位是 **通用模板**
- 作用：沉淀行业/场景级首页骨架，供后续案例继续派生
- 当前模板 slug：`manufacturing-carbon-overview`
- 当前模板路由：`/templates/manufacturing-carbon-overview`

### 1.2 具体案例

- `报喜鸟页面` 的定位是 **具体案例**
- 作用：基于模板做品牌化、场景化、客户语境适配
- 当前案例 slug：`baoxiniao-carbon-cockpit`
- 当前案例路由：`/cases/baoxiniao-carbon-cockpit`
- 当前派生关系：`baoxiniao-carbon-cockpit` ← `manufacturing-carbon-overview`

---

## 2. 目录规则

### 2.1 页面资产目录

- 模板资产：`src/features/templates/<template-slug>/`
- 案例资产：`src/features/cases/<case-slug>/`

每个页面资产目录建议至少包含：

- `screen.tsx`：页面入口屏
- `data.ts`：页面假数据
- `types.ts`：页面专属类型
- `constants.ts`：仅模板或该资产专属的文案/常量

### 2.2 共享组件目录

- 共享图表和共享面板继续放在 `src/components/`
- 只有明确属于某个模板或某个案例的页面级入口，才放进 `src/features/`

---

## 3. 路由规则

- 模板列表：`/templates`
- 模板页面：`/templates/<template-slug>`
- 案例列表：`/cases`
- 案例页面：`/cases/<case-slug>`
- 统一总入口：`/`

说明：

- `/` 只负责资产导航和分组，不承载某个具体模板页面
- 案例路由必须放在 `/cases/` 下，避免和模板混用
- 模板路由必须放在 `/templates/` 下，避免被误认为客户页

---

## 4. 命名规则

### 4.1 模板命名

- 模板名优先使用 `行业 + 场景`
- 推荐示例：
  - `manufacturing-carbon-overview`
  - `industrial-energy-command-center`

### 4.2 案例命名

- 案例名优先使用 `客户/品牌 + 场景`
- 推荐示例：
  - `baoxiniao-carbon-cockpit`
  - `acme-factory-carbon-demo`

### 4.3 变量与组件命名

- 模板页面组件：`ManufacturingCarbonOverviewScreen`
- 模板数据变量：`manufacturingCarbonOverviewData`
- 案例页面组件：`BaoxiniaoCarbonCockpitScreen`
- 案例数据变量：`baoxiniaoCarbonCockpitData`

---

## 5. 入口与注册规则

- 所有模板和案例都要注册到 `src/lib/dashboard-assets.ts`
- 注册信息至少包括：
  - 页面目标
  - 模块清单
  - 图表类型
  - 假数据需求
  - 为什么这样组织页面
- 统一入口页根据这个注册表展示“通用模板 / 具体案例”分组

---

## 6. 后续新增页面时的判断顺序

新增驾驶舱页面时，先判断：

1. 这是行业/场景复用骨架，还是客户展示页？
2. 如果是复用骨架，放进 `templates`
3. 如果是客户展示页，放进 `cases`
4. 如果是案例，必须标注它派生自哪个模板
5. 新页面完成后，补充 `dashboard-assets.ts` 的资产登记

---

## 7. 当前最小落地结果

当前项目已先完成最小改造：

- 把模板和案例页面分别收口到 `templates` / `cases`
- 增加统一资产入口页
- 增加模板列表与案例列表入口
- 保留共享面板在公共组件层，避免一次性过度重构

这样后续继续增加新模板和新案例时，项目结构会先保持清楚，再逐步深化共享层抽象。
