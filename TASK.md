# TASK.md

## Current Task
基于现有仓库结构，优先完成“定制化驾驶舱 AI 配置助手 V0”的入口与页面结构落地准备。

## Task Goal
让 Codex 在最少歧义下理解：
- 这个项目是什么
- 第一版该做什么
- 第一版不该做什么
- 应该如何组织 assistant / templates / cases 三层结构
- 做 assistant 首页时应该如何组织输入、规则摘要、输出和资产关联

## Deliverables
当前文档包应当支持 Codex 完成以下工作：
1. 理解项目边界
2. 理解首页与 assistant 的默认结构
3. 理解 Agent / Skill 关系
4. 根据新入口结构继续实现页面或代码

## Acceptance Criteria
- Codex 读完根目录说明后，能知道当前项目是“定制化驾驶舱 AI 配置助手 V0”
- Codex 能通过 `docs/architecture/index-agent-skill-map.md` 找到整体结构
- Codex 能通过 `docs/agents/` 和 `docs/skills/` 继续细化页面草案方案
- Codex 不会把报喜鸟页或制造业模板页误改成首页
- 文档目录简单、清晰、可扩展

## Recommended Next Tasks for Codex
优先级建议：
1. 完成 `/assistant` 首页的静态方案落地
2. 细化规则判断结果与输出卡内容映射
3. 再补模板和案例与 assistant 的联动说明
4. 最后才进入真实 AI 接口或复杂能力接入
