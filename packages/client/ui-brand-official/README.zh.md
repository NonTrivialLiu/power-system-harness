---
description: "Power System Harness 侧栏品牌展示；供选择或替换品牌呈现的用户与维护者阅读。"
kind: "package-reference"
---

# @deepseek-ai/dsh-client-ui-brand-official

[English](README.md) | 中文

## 概述

本包在侧栏显示 Power System Harness 图标与字标。

## 目录

- [使用本包](#use-this-package)
- [理解实现](#understand-the-implementation)
- [进一步探索](#further-exploration)
- [模型体验](#model-experience)
- [已知限制与延期工作](#known-limitations-and-deferred-work)
- [开发备注](#dev-note)

-----

<a id="use-this-package"></a>
## 使用本包

在 Power System Harness 部署中，将本插件加入浏览器插件列表。

各界面使用固定的产品名称——它们是不同的名字，不是同一名词的拼写变体：

- **Power System Harness** —— 散文中的正式名称。
- **PowerSys Harness** —— 运行显示名：浏览器标题、欢迎窗品牌文字、预览说明、PWA 名称。
- **PSH Desktop** —— 桌面应用名：安装包与可执行文件名、菜单、托盘、关于与更新弹窗。
- **PSH** —— 简称：实例冲突提示、PWA 简称；本地构建标签为 `PSH Local Build`。
- **powersys HARNESS** —— 字标图形的固定大小写。

DeepSeek 模型、账号服务等提供方名称不是产品名，保持原有拼写。

品牌注册与 `DSH_CLIENT_BUILD_PROFILE` 无关。本插件占据侧栏 slot 时，外壳的本地构建标签和构建版本徽标由项目品牌替代。会话首屏使用 `dsh-client-ui-conversation` 中的共用项目图标和 CSS 悬停动效。

### 替换品牌

自有身份的部署不组合本包，而是组合另一个占据侧栏 slot——以及本包留给回退的首屏 slot——的包。占据 slot 是唯一的组合路径；这里不存在任何品牌配置面。

-----

<a id="understand-the-implementation"></a>
## 理解实现

<details>
<summary>实现细节——点击展开</summary>

两个填充作为一组声明感知的注册安装：嵌套的 `ctx.slots.inject()` 调用等待侧栏声明，因此无论本行在声明者之前还是之后激活，这组注册都能工作；声明消失时两个填充一并撤回，HMR 期间也不会留下残缺的品牌混合。浏览器半部是 [`src/client/index.ts`](src/client/index.ts)；node 半部是一个空 Loader 座位。浏览器标题是构建环境的事（`DSH_CLIENT_TITLE`），不在 slot 系统之内。

</details>

-----

<a id="further-exploration"></a>
## 进一步探索

当品牌面不够用时阅读以下页面。它们从本包占据的 slot 进入渲染这些 slot 的外壳。

- [ui-sidebar](../ui-sidebar/README.zh.md)——声明 `sidebar.brand.mark` 与 `sidebar.brand.name` 并渲染其回退。
- [ui-conversation](../ui-conversation/README.zh.md)——在首屏声明 `conversation.hero.brand.mark`。
- [Web 客户端架构](../../../docs/subsystems/web-client.zh.md)——浏览器插件行如何加载并注册 slot。

-----

<a id="model-experience"></a>
## 模型体验

无，因为本包只贡献浏览器呈现；这里没有任何内容进入模型请求。

#### KV Cache 影响

无；本包既不组装也不发送提供方请求。

## 已知限制与延期工作

<a id="known-limitations-and-deferred-work"></a>


这些限制界定了品牌呈现的供给方式。它们是当前包约束，不是品牌设计对比或任务积压。

- **只有一组填充**——替代呈现属于占据相同 slot 的另一个 Cordis 包。
- **浏览器标题独立**——`DSH_CLIENT_TITLE` 在构建时选择标题文本，而非通过 UI slot。

<a id="dev-note"></a>
### 开发备注

<details>
<summary>维护者的工作上下文——点击展开</summary>

无。

</details>
