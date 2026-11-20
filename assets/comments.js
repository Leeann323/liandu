/* 评论区加载器（Giscus · 零后端）
 * 用法：在页面里放 <div id="giscus-mount"></div>，并在此之前定义：
 *   window.GISCUS = { repo: '用户名/仓库', repoId: 'R_xxx', category: 'Announcements', categoryId: 'DIC_xxx' };
 * 参数到 https://giscus.app 生成（需仓库为 public 且已开启 Discussions）。
 */
(function () {
  var cfg = window.GISCUS || {};
  var mount = document.getElementById('giscus-mount');
  if (!mount) return;

  var ready = cfg.repo && cfg.repoId && cfg.categoryId;
  if (!ready) {
    mount.innerHTML =
      '<div class="note"><b>评论区尚未接入。</b><br>' +
      '站主：到 <a href="https://giscus.app" target="_blank" rel="noopener">giscus.app</a> 填仓库名，' +
      '复制生成的 <code>data-repo-id</code> 与 <code>data-category-id</code>，' +
      '写进本页顶部 <code>window.GISCUS</code> 三个字段即可，无需后端。' +
      '（若希望访客免登录匿名留言，改用 Waline，见 README-DEPLOY.md）</div>';
    return;
  }

  var s = document.createElement('script');
  s.src = 'https://giscus.app/client.js';
  s.async = true;
  s.crossOrigin = 'anonymous';
  s.setAttribute('data-repo', cfg.repo);
  s.setAttribute('data-repo-id', cfg.repoId);
  s.setAttribute('data-category', cfg.category || 'Announcements');
  s.setAttribute('data-category-id', cfg.categoryId);
  s.setAttribute('data-mapping', cfg.mapping || 'pathname');
  s.setAttribute('data-strict', '0');
  s.setAttribute('data-reactions-enabled', '1');
  s.setAttribute('data-emit-metadata', '0');
  s.setAttribute('data-input-position', 'top');
  s.setAttribute('data-theme', cfg.theme || 'light');
  s.setAttribute('data-lang', cfg.lang || 'zh-CN');
  s.setAttribute('data-loading', 'lazy');
  mount.appendChild(s);
})();
