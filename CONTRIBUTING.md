## Code Quality

本项目采用一套自动化工具链来保证代码与提交历史的可读性、一致性与安全性。下面内容说明各工具的职责与使用方式。

### Tooling Overview / 工具概览

| 领域         | 工具                                         | 说明                                       |
| ------------ | -------------------------------------------- | ------------------------------------------ |
| 提交消息规范 | commitlint (@commitlint/config-conventional) | 校验提交是否符合 Conventional Commits 规范 |
| Git 钩子     | Husky + lint-staged                          | 提交前格式化 & 静态检查；提交信息校验      |
| 代码格式     | Prettier                                     | 统一代码风格（pre-commit 自动执行）        |
| 语法/质量    | ESLint                                       | 运行 `pnpm lint` 进行代码质量检查          |
| Secrets 同步 | Infisical CLI                                | 登录、拉取并注入环境变量                   |

### Git Hooks (Husky + lint-staged)

已配置的钩子：

1. `pre-commit`: 运行 `lint-staged`，对暂存区内匹配 `*{js,jsx,mjs,ts,tsx,json,css,scss,md}` 的文件执行 Prettier 格式化。
2. `commit-msg`: 运行 `commitlint --edit $1` 校验提交信息。

开发者无需手动调用，只需正常执行 `git commit`。

#### 本地初始化（首次克隆仓库后）

```bash
pnpm install          # 安装依赖，会自动确保 husky 可用 (prepare 脚本)
```

### Commit Message 规范（Conventional Commits）

使用 `@commitlint/config-conventional`，允许的基本格式：

```
<type>(<scope>)!: <subject>

<body>

<footer>
```

说明：

- `<type>`：常用类型（选择最贴切的一个）
  - feat: 新功能
  - fix: 缺陷修复
  - docs: 文档更新
  - style: 代码风格（不影响逻辑，如空格、分号）
  - refactor: 重构（不修复 bug、不加功能）
  - perf: 性能优化
  - test: 测试相关
  - build: 构建系统或依赖变更（如升级依赖）
  - ci: CI 配置变更
  - chore: 其他杂项（与 src 或 test 无直接关联）
  - revert: 回滚提交
- `<scope>`：可选，作用范围（模块、目录、组件名等），如 `ui`, `hooks`, `deps`。
- `!`：可选，表示 BREAKING CHANGE。
- `<subject>`：一句话的更改概述（不以句号结尾，使用动词原形，简洁）。
- `<body>`：可选，详细描述（换行分段）。
- `<footer>`：
  - BREAKING CHANGE 描述：
    ```
    BREAKING CHANGE: 描述破坏性改动及迁移指引
    ```
  - 关联 issue：`Closes #123` / `Refs #456`。

示例：

```
feat(ui): add accessible carousel component

Introduce a11y-friendly carousel with keyboard and screen reader support.

Closes #42
```

包含破坏性改动：

```
refactor(form)!: migrate form validation from yup to zod

BREAKING CHANGE: Validation schemas must be recreated using zod. See docs/forms.md for migration notes.
```

### Lint, Format & Type Check

常用脚本：

```bash
pnpm lint          # 运行 ESLint（使用根级 eslint.config.mjs）
pnpm format        # 使用 Prettier 写入格式
pnpm format:check  # 仅检查不自动修复
```

建议在提交较大改动前本地执行：

```bash
pnpm format && pnpm lint
```

### Secrets 同步（Infisical）

仓库通过 Infisical 管理敏感配置；`.env*` 文件已在 `.gitignore` 中忽略。不要直接提交本地 `.env`。

#### 登录

```bash
pnpm exec infisical login
```

#### 拉取（Pull）环境变量

```bash
# 将远端 (Infisical) 中的变量注入到本地 .env 文件（默认 development 或通过 --env 指定）
pnpm exec infisical pull --environment=dev --path=./
```

常见参数：

- `--environment=<dev|staging|prod>` 指定环境
- `--path=./` 输出目录（默认当前）
- `--format=dotenv`（默认）

#### 注入运行时（可选）

无需写入磁盘直接注入（例如在 CI 中）：

```bash
pnpm exec infisical run -- next dev
```

#### 更新 / 新增 Secrets

1. 在本地 `.env` 修改或新增键值（避免泄漏敏感真实值给 git）。
2. 通过 Infisical Web Console 或 CLI 推送：
   ```bash
   pnpm exec infisical set --secret=API_KEY=xxxx --environment=dev
   ```
3. 通知相关成员重新 `pull`。

#### 安全建议

- 不在代码/提交消息/Issue 中粘贴真实密钥。
- 轮换（rotate）高敏感凭据，并更新文档或通知群。
- 若发生泄漏，立即在 Infisical 中撤销并重新生成。

### 典型开发工作流示例

```bash
git switch -c feat/add-carousel
pnpm install                  # 若首次克隆
pnpm exec infisical pull      # 获取所需环境变量
pnpm dev                      # 开发中 (next dev)

# 编码...

pnpm format && pnpm lint && pnpm tsc --noEmit
git add .
git commit -m "feat(ui): add accessible carousel component"
git push origin feat/add-carousel
```

### 常见问题 (FAQ)

| 问题                            | 处理                                                               |
| ------------------------------- | ------------------------------------------------------------------ |
| commit 被拒绝，显示 type 不合法 | 确认使用了允许的 Conventional Commits 类型，例如 `feat` / `fix` 等 |
| 提交时自动格式化失败            | 先本地运行 `pnpm format`，然后重新暂存提交                         |
| 找不到某个环境变量              | 确认已 `infisical login` 且使用正确 `--environment` 拉取           |
| 类型错误阻塞构建                | 运行 `pnpm tsc --noEmit` 找出具体错误位置并修复                    |
