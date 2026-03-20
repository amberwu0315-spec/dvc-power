# Agent / Skill 总目录

## 1. 文档目的
用于统一说明当前 v1 Agent / Skill 文档的结构、关系与调用顺序，方便后续查阅、补充和落地。

---

## 2. 当前文档清单

### 2.1 Agent 文档
- `agent-01-需求理解-agent.md`
- `agent-02-页面编排-agent.md`
- `agent-03-demo方案输出-agent.md`

### 2.2 Skill 文档
- `skill-01-行业归类-skill.md`
- `skill-02-风格推荐-skill.md`
- `skill-03-首页骨架生成-skill.md`
- `skill-04-模块配置-skill.md`
- `skill-05-图表与数据匹配-skill.md`
- `skill-06-假数据生成-skill.md`
- `skill-07-背景图提示词-skill.md`
- `skill-08-模板说明生成-skill.md`

---

## 3. v1 最小闭环

v1 当前最核心的目标不是做成复杂平台，而是跑通一条最小链路：

**模糊需求输入**  
→ **需求理解**  
→ **页面编排**  
→ **首页方案输出**

也就是先解决：

- 从宽泛需求里找到方向
- 快速确定首页结构
- 输出一版可直接开工的 demo 方案

---

## 4. Agent 与 Skill 的关系

### 4.1 Agent 的作用
Agent 负责：

- 理解问题
- 做判断
- 串联流程
- 调用 Skill
- 输出阶段性结果

### 4.2 Skill 的作用
Skill 负责：

- 执行明确能力
- 提供稳定规则输出
- 作为可复用能力被 Agent 调用

### 4.3 当前关系理解
可以把它理解成：

- Agent 像“策划者 / 组织者”
- Skill 像“工具能力模块”

---

## 5. 推荐调用顺序

### Step 1：需求理解 Agent
文档：`agent-01-需求理解-agent.md`

主要调用：
- `skill-01-行业归类-skill.md`
- `skill-02-风格推荐-skill.md`

输出结果：
- 行业归类
- 页面类型建议
- 主风格建议
- 首页重点内容

---

### Step 2：页面编排 Agent
文档：`agent-02-页面编排-agent.md`

主要调用：
- `skill-03-首页骨架生成-skill.md`
- `skill-04-模块配置-skill.md`
- `skill-05-图表与数据匹配-skill.md`

输出结果：
- 首页骨架
- 模块清单
- 模块顺序
- 页面叙事逻辑
- 图表建议

---

### Step 3：Demo 方案输出 Agent
文档：`agent-03-demo方案输出-agent.md`

主要调用：
- `skill-06-假数据生成-skill.md`
- `skill-07-背景图提示词-skill.md`
- `skill-08-模板说明生成-skill.md`

输出结果：
- 首页方案摘要
- 假数据需求说明
- 背景图方向说明
- 模板说明文案
- 可直接执行的制作说明

---

## 6. v1 建议优先级

### 6.1 第一优先级
这些文档最适合先细化，因为它们直接决定最小闭环能不能跑通：

- `agent-01-需求理解-agent.md`
- `agent-02-页面编排-agent.md`
- `skill-01-行业归类-skill.md`
- `skill-02-风格推荐-skill.md`
- `skill-03-首页骨架生成-skill.md`
- `skill-04-模块配置-skill.md`

### 6.2 第二优先级
这些文档在首页方案稳定后继续补：

- `skill-05-图表与数据匹配-skill.md`
- `skill-06-假数据生成-skill.md`
- `skill-07-背景图提示词-skill.md`
- `skill-08-模板说明生成-skill.md`
- `agent-03-demo方案输出-agent.md`

---

## 7. 推荐阅读顺序

如果后续要自己继续完善，建议按这个顺序读和改：

1. `agent-01-需求理解-agent.md`
2. `skill-01-行业归类-skill.md`
3. `skill-02-风格推荐-skill.md`
4. `agent-02-页面编排-agent.md`
5. `skill-03-首页骨架生成-skill.md`
6. `skill-04-模块配置-skill.md`
7. `skill-05-图表与数据匹配-skill.md`
8. `agent-03-demo方案输出-agent.md`
9. `skill-06-假数据生成-skill.md`
10. `skill-07-背景图提示词-skill.md`
11. `skill-08-模板说明生成-skill.md`

---

## 8. 当前 v1 调用链示意

```md
输入：客户模糊需求

→ 需求理解 Agent
  → 行业归类 Skill
  → 风格推荐 Skill

→ 页面编排 Agent
  → 首页骨架生成 Skill
  → 模块配置 Skill
  → 图表与数据匹配 Skill

→ Demo 方案输出 Agent
  → 假数据生成 Skill
  → 背景图提示词 Skill
  → 模板说明生成 Skill

输出：可直接开工的首页 demo 方案
```

---

## 9. 后续建议

接下来最值得继续补的，不是再扩更多 Agent / Skill，而是：

### 9.1 补规则
把以下文档从“说明型”继续补成“规则型”：

- 行业归类 Skill
- 风格推荐 Skill
- 首页骨架生成 Skill
- 模块配置 Skill

### 9.2 补实例
给每个 Agent / Skill 增加：

- 1 个输入例子
- 1 个输出例子
- 1 个失败例子或边界说明

### 9.3 补首页模块配置表
让 `skill-04-模块配置-skill.md` 进一步落到首页真实模块。

---

## 10. 一句话说明

当前这套文档已经可以作为 v1 的 Agent / Skill 结构底稿使用。  
后续只要沿着“先补规则、再补实例、再补真实页面配置”的顺序往下走，就会越来越接近可执行方案。
