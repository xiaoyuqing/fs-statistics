//异步载入js文件，by heimanba and minify
var lazyJs=function(){var h=document,a,i=[],c=[],b;function f(j,m){var d,k;e();if(j.src){j.src=j.src.constructor===Array?j.src:[j.src];for(var l=0;l<j.src.length;l++){if(j.src[l].constructor!==Array){j.src[l]=[j.src[l]]}c.push(j.src[l])}}i=c.shift();a=a||h.getElementsByTagName("head")[0];j.src=i;for(var l=0;l<j.src.length;l++){k=j.src[l];d=h.createElement("script");d.src=k;d.type="text/javascript";if(b.ie){d.onreadystatechange=function(){var n=this.readyState;if(n==="loaded"||n==="complete"){this.onreadystatechange=null;g(j,m)}}}else{d.onload=d.onerror=function(){g(j,m)}}a.appendChild(d)}}function g(d,k){var j=i;if(!j){return}j.shift();if(!j.length){if(c.length){f(d,k)}else{if(typeof k=="function"){k()}return}}}function e(){if(b){return}var d=/msie/i.test(navigator.userAgent.toLowerCase());b={ie:d}}return{init:function(d,j){f(d,j)}}}();

/* usage
lazyJs.init({
    src: [
            "./libs/angular.min.js",
            "./libs/angular-ui-router.min.js",
            "./libs/garbled/d3.js",
            "./libs/garbled/nv.d3.js"
        ]
},function(){
    console.log('loaded');
});*/
