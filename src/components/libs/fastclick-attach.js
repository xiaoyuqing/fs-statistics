// 引入fast-click，消除click事件300ms延迟
let FastClick = require('fastclick');
document.addEventListener('DOMContentLoaded', () => {
    FastClick.attach(document.body);
});
module.exports = null;