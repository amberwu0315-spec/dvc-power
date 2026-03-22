# AGENTS.md

## Project
定制化驾驶舱 AI 配置助手 V0

## Objective
本项目不是完整的自由搭建平台，而是一个用于辅助驾驶舱前置方案阶段的轻量产品原型。
当前版本优先验证：是否能显著提升从模糊需求到页面草案的产出效率。

## v1 Scope
只做以下范围：
- 产品定位：定制化驾驶舱 AI 配置助手 V0
- 结构：assistant / templates / cases 三层入口
- 输出目标：页面结构建议、模块配置建议、信息缺失提醒、执行说明输出
- 资产保留：制造业能碳模板、报喜鸟案例
- 数据：全部使用假数据或静态占位内容

## Explicitly Out of Scope
当前版本不要做：
- 真实 AI 接口优先接入
- 聊天式工作台
- 历史记录 / 版本管理
- 复杂后台
- 自由拖拽编辑器
- 组件市场
- 一键生成最终可上线页面
- 大而全行业平台扩展

## Design Principles
- 先整体，后拆解，再管理对象
- 优先复用结构，不从零发明页面
- 优先输出“可执行页面方案”，而不是空泛概念
- 风格要专业、稳定、清晰，不走过重赛博炫技
- 页面结构服务于叙事，不只是服务于排版

## Default Homepage Structure
- 顶部产品定位区
- 三层入口区
- V0 边界说明区

## Default Assistant Structure
- 顶部定位区
- 输入区
- 规则判断摘要区
- 输出区
- 关联资产区
- 边界说明区

## Default Assistant Outputs
- 页面结构建议
- 模块配置建议
- 信息缺失提醒
- 执行说明输出

## Implementation Guidance
当你执行任务时，优先读取：
1. `TASK.md`：本次具体任务与验收标准
2. `docs/architecture/index-agent-skill-map.md`：总目录与调用关系
3. `docs/agents/`：Agent 级职责文档
4. `docs/skills/`：Skill 级规则文档

## Coding Guidance
- 优先组件化、配置化
- 优先静态可运行版本
- 优先保证页面结构清晰和演示完整
- 先做可用，再做复杂增强
- 避免引入和当前任务无关的大量工程复杂度

## Output Expectation
每次输出至少要满足以下要求：
- 明确当前页面目标
- 明确当前属于 assistant / templates / cases 中哪一层
- 明确当前输出是结构建议、模块建议、缺失提醒还是执行说明
- 明确哪些内容是静态占位，哪些内容后续应继续完善
- 明确为什么这样组织页面
