# TanStack Start + shadcn/ui

This is a template for a new TanStack Start project with React, TypeScript, and shadcn/ui.

## Adding components

To add components to your app, run the following command:

```bash
npx shadcn@latest add button
```

This will place the ui components in the `components` directory.

## Using components

To use the components in your app, import them as follows:

```tsx
import { Button } from "@/components/ui/button"
```

## Codex 文档说明

本项目已补充以下面向 Codex 的文档：

- `AGENTS.md`：项目级最高优先级规则
- `TASK.md`：当前任务、目标与验收标准
- `docs/architecture/`：结构总览
- `docs/architecture/page-asset-organization.md`：模板 / 案例 页面资产组织规则
- `docs/agents/`：Agent 级文档
- `docs/skills/`：Skill 级文档

### 推荐阅读顺序

1. `AGENTS.md`
2. `TASK.md`
3. `docs/architecture/index-agent-skill-map.md`
4. `docs/agents/agent-01-需求理解-agent.md`
5. `docs/agents/agent-02-页面编排-agent.md`
6. `docs/skills/skill-03-首页骨架生成-skill.md`
7. `docs/skills/skill-04-模块配置-skill.md`

### 使用建议

请优先将 `AGENTS.md`、`TASK.md` 和 `docs/` 作为项目规则与任务文档使用。
