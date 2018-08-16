// 无阻塞加载js脚本代码片段
module.exports = function(src, inject) {
  if (!src) return;
  let node = inject === 'head' ? document.head : document.body;
  let script = document.createElement('script');
  script.src = src;
  node.appendChild(script);
};
