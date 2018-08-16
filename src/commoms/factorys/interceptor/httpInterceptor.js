export default function httpInterceptor($q) {
    return {
        request: function (config) {
            return config;
        },

        response: function (result) {
            return result;
        },

        responseError: function (rejection) {
            alert('网络链接失败，请稍后重试！');
            return $q.reject(rejection);
        }
    }
}

httpInterceptor.$inject = ['$q'];