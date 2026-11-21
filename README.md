# 莲渡文汇 · Lian Du Wen Hui

一个以中文阅读与交流为主的小站：成篇的阅读笔记、各类素材存档、少量短评，页面底部可留言讨论。

- 站点地址：https://leeann.is-a-fullstack.dev
- 形态：**纯静态**（HTML + CSS + 几个小脚本），托管于 GitHub Pages
- 评论：Giscus（基于 GitHub Discussions，无后端、无数据库）
- 性质：**个人非商业**站点，无广告、无会员、无付费内容

## 这个仓库是什么

本站的全部源码。没有构建步骤，改完 HTML 直接提交即可生效。

## 板块

「莲叙」只分两块，讨论都在板块页底部，不按单篇开帖：

- **深读｜认真回答** `/qa/deep.html`：成篇笔记、版本与考据、书目比较、方法复盘
- **日常｜随手种草** `/qa/daily.html`：短句、一句话推荐、今天觉得好用的东西

「莲藏」`/library/` 是一个素材抽屉：作者与作品、清单与模板、工具与线索，有什么放什么，一条一卡。
文件能放进仓库的放在 `library/files/`（单个建议 ≤20MB），放不下的给外部链接。

## 它不是什么

- 不是论坛：不做实时版聊、用户等级、积分
- 不是资源站：**不托管、不上传、不分发**任何第三方作品的全文；「莲藏」只收本人整理的资料与公有领域内容，外部链接仅作索引
- 不代表任何组织，观点只代表作者本人

## 内容与版权

站内原创文字采用 [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/deed.zh) 许可，转载请署名并注明来源，不得用于商业用途。

若认为某条内容或索引侵犯您的权利，请写信至 `13332430323@189.cn` 或提交 Issue，注明链接与权利证明，核实后 48 小时内移除。

## 部署方式

见 [README-DEPLOY.md](README-DEPLOY.md)：GitHub Pages 部署、自定义域名、Giscus 接入、以及备用评论方案 Waline。

## 目录

```
index.html        首页
qa/               莲叙
  index.html      两个板块入口
  deep.html       深读（板块 + 讨论区）
  daily.html      日常（板块 + 讨论区）
  *.html          文章页
library/          莲藏
  index.html      素材存档（条目写在页面脚本的 ITEMS 里）
  files/          可放进仓库的资料文件
submit/           投稿说明
about/ rules/     关于 / 站规
assets/           样式、评论加载器、Giscus 配置
```
