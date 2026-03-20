# TASK.md

## Current Task
基于现有文档体系，使用 Codex 时优先完成“制造业能碳总览型首页 demo”的方案落地准备。

## Task Goal
让 Codex 在最少歧义下理解：
- 这个项目是什么
- 第一版该做什么
- 第一版不该做什么
- 应该优先参考哪些文档
- 做首页页面时应该如何组织模块

## Deliverables
当前文档包应当支持 Codex 完成以下工作：
1. 理解项目边界
2. 理解首页默认结构
3. 理解 Agent / Skill 关系
4. 根据首页模块规则继续实现页面或代码

## Acceptance Criteria
- Codex 读完根目录说明后，能知道当前项目只做制造业能碳首页 demo
- Codex 能通过 `docs/architecture/index-agent-skill-map.md` 找到整体结构
- Codex 能通过 `docs/agents/` 和 `docs/skills/` 继续细化页面方案
- 文档目录简单、清晰、可扩展

## Recommended Next Tasks for Codex
优先级建议：
1. 细化 `skill-04-模块配置-skill.md`
2. 产出首页模块配置表
3. 再基于模块配置表生成首页页面实现说明
4. 最后才进入实际前端页面编码
