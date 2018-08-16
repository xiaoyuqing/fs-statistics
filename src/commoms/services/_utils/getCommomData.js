export default function getCommomData(params){
    //参数的获取
    
    // var $rootScope = params.$rootScope;
    // var routerStart = params.routerStart;

    //ajax 的loading效果
    var toast = params.toastService.alert({
        loading: '加载中'
    },true);

    //马上异步加载 下个页面的 js文件
    if(!window['d3'] || !window['nv'] ){
      params.loadJS && params.loadJS(); 
    }
    
    return params.$http(
        //注意顺序  需要后面的对象属性覆盖前面的对象属性
        angular.merge(params.APICONF, params.apiOption)
        
    ).then ((responseData) => {
        //数据删除loading
        params.toastService.dismiss(toast);

        var data = responseData.data;
        
        if (data && data.errCode == 0) {
            var datas = {}
                datas.dataList = params.$filter(params.BIZTYPE+'Adapter')(data);

                params.cellType && (datas.dataList.cellType = params.cellType);

            datas.dataList.boolString = function(str){
                return angular.isString(str);
            }

            datas.dataList.dataMap = {//保持顺序的map值
                dataPoints: params.DATAMAP[params.dataMapType],
                dataDisplayAttrs: params.DATAMAP.displayMapAttrs
            };
                      
            return datas;
           

      }else{
        params.toastService.alert({
            content: responseData.data.errMsg
        }, true);
      }
    });

}
