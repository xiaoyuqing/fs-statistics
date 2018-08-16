// 数据采集模块
let device = require('./device');
let collector = {
    //H5项目Id
    projectId: '',
    appid: '',
    appversion: /fsh5\/[\w|\-]*\/([\d|\.]*)\/?/g.test(location.href) ? RegExp.$1 : 'unknown',
    host: /\w+\.(\w+)\.\w+/g.test(location.host) ? RegExp.$1 : 'fxiaoke',
    // 白名单：需要采集的api集合，不在集合内的api请求，不予采集；当指定为'all'，则采集任何接口
    apis: [],
    // 采集log
    log: function(event, params, isApi) {
        if (!collector.projectId || !event) return;
        if (isApi && collector.apis !== 'all' && collector.apis.indexOf(params.api) === -1) return;

        params = params || {};
        params.projectId = collector.projectId;
        params.appid = collector.appid;
        params.appversion = collector.appversion;
        params.actionId = event;
        params._fplatform = device.ios ? 'ios' : (device.android ? 'android' : 'pc');
        params._fversion = device.version;
        params._t = _.now();

        if (process.env.NODE_ENV !== 'production') {
            return null;
        }

        // 延迟5s上报，以免阻塞页面load
        _.delay(5000, () => {
            let img = new Image();
            img.src = _.queryString(`//sp.${collector.host}.com/m.gif`, params);
        });
    }
};

window.addEventListener('load', function() {
    if (!('performance' in window) && !('webkitPerformance' in window)) return;

    setTimeout(function() {
        let performance = window.performance || window.webkitPerformance;
        let timing = performance.timing;
        // 统计白屏时间
        let btime = timing.responseStart - timing.navigationStart;
        // 统计domready耗时
        let rtime = timing.domContentLoadedEventEnd - timing.navigationStart;
        //  统计load耗时
        let ltime = timing.loadEventEnd - timing.navigationStart;
        collector.log('loadtime', {
            t_blank: btime,
            t_ready: rtime,
            t_load: ltime
        });
    }, 0);
});

// 全局捕捉Error和Exception
window.onerror = function(msg, url, line) {
    process.env.NODE_ENV !== 'production' ? alert(msg + ',' + url + ',' + line) : null;
    collector.log('jserror', {
        msg: msg
    });
    return true;
};

module.exports = collector;