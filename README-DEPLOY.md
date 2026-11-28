# 莲渡文汇 · 部署说明（GitHub Pages + Giscus）

已确定的方案：**GitHub Pages 托管 + Giscus 评论 + 自定义域名 `leeann.is-a-fullstack.dev`**。
站点为纯静态，无构建步骤、无依赖。

```
liandu/
├─ index.html                首页
├─ qa/index.html             莲叙（问答列表）
├─ qa/001-*.html  qa/002-*.html   问答详情（含评论区）
├─ library/index.html        莲藏（我做的东西，链到 GitHub）
├─ submit/index.html         投稿
├─ about/  rules/            关于 / 站规
├─ 404.html                  自定义 404（样式内联，任意路径可用）
├─ CNAME                     自定义域名（必须存在）
├─ .nojekyll                 禁用 Jekyll（GitHub Pages 必需，否则会忽略部分文件）
├─ robots.txt
├─ README.md                 仓库首页说明（审核员会看到）
└─ assets/
   ├─ style.css              全部样式
   └─ comments.js            Giscus 加载器
```

> 站内链接全部为**相对路径**，所以下面两种访问方式都能正常打开：
> `https://leeann323.github.io/liandu/`（域名生效前）和 `https://leeann.is-a-fullstack.dev`（生效后）。

---

## 0. 联系邮箱（已完成）

全站 12 处已统一为 **`13332430323@189.cn`**：首页页脚以外的所有页面、`rules/` 侵权处理、`submit/` 投稿说明、两篇问答详情。

其余可选项：`github.com/Leeann323`（关于页）、示例文章标题，按需替换。

---

## 1. 建仓库并上传（本机没装 git 的走这条路）

1. GitHub 新建仓库 **`liandu`**，选 **Public**（Giscus 要求 public），不要勾 README 初始化
2. 在仓库页点 **Add file → Upload files**，把 `liandu` 目录里的**所有文件和文件夹**拖进去
   （Chrome / Edge 支持拖文件夹，会保留子目录结构）
3. 提交信息填 `init: 莲渡文汇 静态站`
4. **补建 `.nojekyll`**：网页拖拽常会漏掉以 `.` 开头的文件 →
   **Add file → Create new file** → 文件名填 `.nojekyll` → 内容留空 → Commit
5. 确认 `CNAME` 也在仓库根目录（内容应为 `leeann.is-a-fullstack.dev`）

> 有 git 的话：`git clone` 空仓库 → 拷入文件 → `git add -A && git commit -m "init" && git push`。

---

## 2. 开启 GitHub Pages

1. 仓库 **Settings → Pages**
2. **Source** 选 `Deploy from a branch`
3. **Branch** 选 `main`，目录选 **`/ (root)`** → Save
4. 等 1–2 分钟，访问 `https://leeann323.github.io/liandu/` 应能看到首页
   （此时样式、导航、子页面全部正常，因为链接是相对路径）

---

## 3. 绑定自定义域名（等 OpenDomains 审核通过后再做）

**OpenDomains 申请表单**（先提交这个，通过后才有 DNS）：

| 字段 | 值 |
|---|---|
| Subdomain | `leeann` |
| Root Domain | `is-a-fullstack.dev` |
| Type | `CNAME` |
| Value | `leeann323.github.io` |
| TTL | `3600` |
| Proxied | **关闭**（DNS only） |
| Preview Link | `https://github.com/Leeann323/liandu` |

项目描述（直接粘）：

```
A non-commercial personal website for Chinese reading and cultural exchange, named
"莲渡文汇" (Lian Du Wen Hui). It publishes my own reading notes and curated public
reference links, with a Q&A section where visitors can leave comments via GitHub
Discussions. Static site hosted on GitHub Pages. No accounts, no ads, no paid content,
no commercial activity.
```

审核通过后：

1. 仓库 **Settings → Pages → Custom domain** 填 `leeann.is-a-fullstack.dev` → Save
   - 显示 *DNS check unsuccessful* 属正常，别删别重填
2. 本地验证：`nslookup leeann.is-a-fullstack.dev 1.1.1.1` → 应看到指向 `leeann323.github.io`
3. 解析生效后回到 Pages 页，勾 **Enforce HTTPS**（证书签发几分钟到 24 小时）
4. 访问 `https://leeann.is-a-fullstack.dev` 确认无证书警告

> `CNAME` 文件已经在仓库里，**不要删**——删了自定义域名会在下次部署后失效。
> 你原来的用户站 `Leeann323.github.io` 不受影响，一个域名只绑一个站点。

---

## 4. 接入 Giscus（默认评论方案）

前置：仓库 public。

1. **Settings → General → Features** 勾选 **Discussions**
   （首次开启后，到 Discussions 标签页随便建一个分类，如 `Announcements`）
2. 打开 https://github.com/apps/giscus → **Install** → 只授权 `liandu` 这一个仓库
3. 打开 https://giscus.app ，依次填：
   - Repository：`Leeann323/liandu`
   - Discussion mapping：`pathname`（每页独立讨论串）
   - Discussion category：`Announcements`
   - 页面下方会生成一段带 `data-repo-id="R_..."` 和 `data-category-id="DIC_..."` 的代码
4. 打开 `qa/001-weishenme-yao-du-shu.html` 和 `qa/002-gu-wen-ru-men-shu-mu.html`，
   把底部的配置填满（`repo` 已经预填好）：

```js
window.GISCUS = {
  repo: 'Leeann323/liandu',
  repoId: 'R_kgDOxxxxxxx',        // ← giscus.app 生成
  category: 'Announcements',
  categoryId: 'DIC_kwDOxxxxxxx'   // ← giscus.app 生成
};
```

5. 提交后刷新页面，评论区出现即可发一条测试留言
6. **审核设置**：Giscus 本身没有审核队列，留言即公开。若要「先审后发」，
   用 GitHub Discussions 的 **Announcements 分类**（仅维护者可发帖）或改用 Waline（见第 6 节）

### 新增一篇问答时

复制 `qa/001-*.html` → 改名（`003-英文短标题.html`）→ 改标题正文 →
在 `qa/index.html` 和 `index.html` 各加一行链接。评论区沿用同一段配置即可。

### 已知限制

- 访客需要 **GitHub 账号**才能留言
- `giscus.app` 在中国大陆访问可能不稳定（脚本加载失败时页面只显示占位区，不影响正文）

---

## 5. 常见问题

| 现象 | 原因 / 处理 |
|---|---|
| 首页能开但没样式 | 检查 `assets/style.css` 是否上传成功；检查路径大小写（GitHub Pages 区分大小写） |
| 子页面 404 | 确认上传时保留了 `qa/`、`library/` 等子目录 |
| Pages 一直显示 DNS check unsuccessful | OpenDomains 记录还没生效，或 Proxied 被打开了；等几分钟到 1 小时 |
| 勾不上 Enforce HTTPS | 证书还在签发；确认 CNAME 值是 `leeann323.github.io`（不能带 `https://` 或路径） |
| 改了 HTML 但页面没变 | Pages 部署有 1–2 分钟延迟，Ctrl+F5 强刷；或看仓库 Actions 里的 pages build 状态 |
| 评论框空白但正文正常 | `giscus.app` 被网络阻断，或 `repoId`/`categoryId` 没填对 |

---

## 6. 备用：Waline（访客免登录、国内可访问）

如果之后发现访客因「要 GitHub 登录」而无法留言，再切这个。需要多一个免费后端：

1. Neon / LeanCloud 建库拿连接串
2. Waline 官方模板一键部署到 Vercel，环境变量 `DATABASE_URL`
3. 访问 `https://<你的>.vercel.app/ui/register` 注册管理员（可开评论审核、设敏感词）
4. 把两个问答页的评论区代码换成：

```html
<link rel="stylesheet" href="https://unpkg.com/@waline/client@v3/dist/waline.css">
<script type="module">
  import { init } from 'https://unpkg.com/@waline/client@v3/dist/waline.js';
  init({
    el: '#giscus-mount',
    serverURL: 'https://你的-waline.vercel.app',
    lang: 'zh-CN',
    login: 'disable',
    requiredMeta: ['nick'],
    meta: ['nick', 'mail', 'link']
  });
</script>
```

（`assets/comments.js` 就可以删掉或留着不用）

---

## 7. 上线检查清单

- [x] 联系邮箱已设为 `13332430323@189.cn`（全站 12 处）
- [ ] `.nojekyll` 存在（仓库根目录）
- [ ] `CNAME` 内容 = `leeann.is-a-fullstack.dev`，单行
- [ ] `https://leeann323.github.io/liandu/` 能正常浏览全站
- [ ] OpenDomains 申请已提交（CNAME → `leeann323.github.io`，Proxied 关闭）
- [ ] 审核通过后：Pages Custom domain 已填 + Enforce HTTPS 已勾
- [ ] `https://leeann.is-a-fullstack.dev` 打开无警告
- [ ] Giscus 已授权仓库、`repoId`/`categoryId` 已填、测试留言成功
- [ ] `/rules/` 里的邮箱与 48 小时时限真实可用
- [ ] 手机宽度（≤560px）导航不换行错位

---

## 8. 以后想升级

- **站内搜索**：加 Pagefind（构建期生成索引，纯静态可用）
- **流量变大**：迁 Cloudflare Pages（把 OpenDomains 的 CNAME 改成 `<项目>.pages.dev`，需走一次 edit request）
- **要匿名评论 / 审核队列**：上第 6 节的 Waline
