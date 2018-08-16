(function(_w) {
    'use strict';

    function injectStyle(csstext){

    	var head = document.head || document.getElementsByTagName('head')[0],
    	    style = document.createElement('style');
    	style.type = 'text/css';
    	if (style.styleSheet){
    	  style.styleSheet.cssText = csstext;
    	} else {
    	  style.appendChild(document.createTextNode(csstext));
    	}
    	head.appendChild(style);

    }

    var injectScripts = function(params ,callback){

        var jstext = params.data;
        var preload = params.preload;

        var isLoaded = false;

        var handle = setInterval(function(){
        	//强制转为数组
        	preload = Array.isArray(preload) ? preload : [preload];

            // 通过判断是否在window 对象上面挂载，来判断是否已经加载成功
            for (var i = 0, plen = preload.length ; i < plen; i++) {

                if (window[preload[i]]) {
                    var checkPre = true;
                    //还需要再次判断 此之前的是否已经加载成功
                    for (var j = 0; j < i; j++) {
                        if (!window[preload[j]]) {
                            checkPre = false;
                        }
                    }
                    if (i === plen -1) {
                        isLoaded  = checkPre;
                    }
                }
            }

			if (isLoaded) {

                clearInterval(handle);

                if (!callback) {
                    var body = document.body;
                    var script = document.createElement('script');
                    script.innerHTML = jstext;
                    body.appendChild(script);
                }else{
                    callback();
                }
			}
        }, 50);

    }


    var loadStyle =  function(src, inject) {
      if (!src) return;
      var node = inject === 'head' ? document.head : document.body;
      var link = document.createElement('link');
      link.setAttribute("rel", "stylesheet");
      link.setAttribute("type", "text/css");
      link.setAttribute("href", src);
      node.appendChild(link);

    };

    var loadScript =  function(src, inject) {
      if (!src) return;
      var node = inject === 'head' ? document.head : document.body;
      var script = document.createElement('script');
      script.src = src;
      node.appendChild(script);
    };

    _w.getFsResource = {
    	injectStyle: injectStyle,
    	injectScripts: injectScripts,
        loadStyle: loadStyle,
        loadScript: loadScript

    }
})(this);