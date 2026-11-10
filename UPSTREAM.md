# power-system-harness：上游维护

## 仓库与版本

本项目是面向电力系统的私有衍生仓库，保留 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) 的 Git 历史。GitHub 的公开项目 fork 保持公开，因此本项目采用独立私有仓库，通过 Git remote 同步上游；平台规则见 [GitHub Forks](https://docs.github.com/en/pull-requests/reference/forks)。

初始版本为 [dsh-v0.2.1-rc.5](https://github.com/deepseek-ai/deepseek-harness/releases/tag/dsh-v0.2.1-rc.5)，发布于 2026-10-30。截至 2026-11-10，上游全部 GitHub Release 均为预发布，npm 也没有正式版本；这个固定候选版作为商业开发起点，运行稳定性仍需按实际业务验证。后续版本从 [官方发布记录](https://github.com/deepseek-ai/deepseek-harness/releases) 选择，优先正式发布；接纳候选版时明确记录版本。

| 引用 | 用途 |
| --- | --- |
| `origin` | 私有仓库 `NonTrivialLiu/power-system-harness`，默认推送目标 |
| `upstream` | DeepSeek 官方仓库，仅拉取 |
| `main` | 商业开发主分支，跟踪 `origin/main` |
| `upstream-base` | 最近已合入主分支的纯上游版本，跟踪 `origin/upstream-base` |
| `upstream/master` | 官方开发分支的本地跟踪引用，用于查看尚未接纳的变化 |

```text
DeepSeek release A ----- release B
          |                 |
          +-- main -------- merge -- 商业开发
                            |
                      upstream-base
```

商业功能优先通过上游已有插件和配置接口扩展，减少核心文件改动。上游升级使用保留父提交的合并，便于 Git 识别已接纳的历史；产品标签使用 `power-vX.Y.Z`，与上游的 `dsh-v*` 标签区分。

## 新机器配置

克隆命令只导入私有仓库。额外 remote、推送设置与身份配置属于本机 Git 配置，需要在每个新克隆中设置：

```sh
git clone https://github.com/NonTrivialLiu/power-system-harness.git
cd power-system-harness
git remote add upstream https://github.com/deepseek-ai/deepseek-harness.git
git remote set-url --push upstream disabled://upstream-read-only
git config remote.pushDefault origin
git config push.default simple
git config fetch.prune true
git config pull.ff only
git fetch upstream --tags
git remote set-head upstream master
git branch --track upstream-base origin/upstream-base
```

提交前用 `git var GIT_AUTHOR_IDENT` 核对自己的姓名和 GitHub 关联邮箱。

## 接纳上游版本

以下流程从干净的工作区开始，先同步私有主分支和官方发布标签，再查看当前上游起点到目标版本的差异。将示例版本变量替换为已经选定的发布标签：

```sh
git switch main
git pull --ff-only origin main
git fetch origin upstream-base
git fetch upstream --tags
release_tag=dsh-vX.Y.Z
git log --oneline origin/upstream-base.."$release_tag"
git diff --stat origin/upstream-base "$release_tag"
git switch -c "upgrade/$release_tag"
git merge --no-ff --no-commit "$release_tag"
```

解决冲突后，按 [上游检查指南](.agents/skills/dsh-pre-push-checks/SKILL.md) 验证受影响功能，再提交合并并推送升级分支，在私有仓库创建面向 `main` 的 PR。采用 merge commit 合并该 PR，保留上游祖先关系。若放弃这次尚未提交的合并，可执行 `git merge --abort`。

升级 PR 合并后，将纯上游分支快进至同一发布标签；该分支保持官方代码，商业提交留在 `main`：

```sh
git switch main
git pull --ff-only origin main
git merge-base --is-ancestor "$release_tag" main
git switch upstream-base
git pull --ff-only origin upstream-base
git merge --ff-only "$release_tag"
git push origin upstream-base
git switch main
```

祖先检查失败时先核对 PR 合并方式与目标版本；快进失败时先核对上游发布历史和分支状态，再决定如何处理。

## 发布与许可

GitHub Actions 在私有仓库中关闭。上游工作流包含 npm 发布、桌面发布与站点部署；启用项目 CI 时，先按本项目的发布目标配置工作流与凭据。

上游代码采用 [MIT](LICENSE)，允许商业使用、修改和分发；分发包含其代码的副本或实质部分时，保留版权与许可声明。第三方组件的许可见 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)，产品名称与宣传材料参考 [品牌指南](BRAND_GUIDELINES.md)。
