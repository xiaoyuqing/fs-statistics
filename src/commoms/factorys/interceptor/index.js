import httpInterceptor from "./httpInterceptor";

export default angular.module("factory.interceptor.httpInterceptor", [])
    .factory("httpInterceptor", httpInterceptor)
    .name;