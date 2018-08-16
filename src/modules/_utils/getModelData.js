export default function getModelData(params) {
    //参数的获取
    var EventBus = params.EventBus;
    var context = params.context;
    var bizModel = params.bizModel;
    var bizAction = params.bizAction;
    var eventList = params.eventList;
    // var eventType = params.eventType || 'on';
    
    var $rootScope = params.$rootScope;
    angular.forEach(eventList, function(item){
        
        EventBus.on(item, (event) =>{

            bizModel[bizAction](event.data)
                .then((value)=>{   
                    var dataList = value && value.dataList && value.dataList;
                    console.log(dataList);

                    if (!dataList) {
                        context.dataList =null;
                        return;
                    }
                    //过滤为空的情况
                    if (angular.isArray(dataList.data)) {
                        dataList.data = dataList.data.filter(function filterData(value) {
                            return Object.keys(value.dataPoints).length > 0;
                        });
                    }
                    
                    // if(event.type== 'fs-filter-app'){ //筛选应用的时候执行                                                                           
                    //  context.dataList = angular.extend({},dataList);
                    //  context.dataList.data = [];
                    //  for(var i =0; i< dataList.data.length; i++){
                    //      for(var j = 0; j<$rootScope.appenName.length;j++){
                    //         if(dataList.data[i].enName == $rootScope.appenName[j]){
                    //              context.dataList.data.push(dataList.data[i]);                                       
                    //                }
                    //         }
                    //  }                        
                    //    return context.dataList;
                    // }

                    // if ($rootScope&&$rootScope.showAppFilter) {
                    //          $rootScope.fs_dataList = angular.extend({},dataList);
                    // }

                    // if($rootScope.showAppFilter){ //默认显示前三个应用
                    //    angular.isArray(dataList.data) && (dataList.data = dataList.data.slice(0,3)); 
                    //    $rootScope.appenName = [];
                    //    for (var k = 0;k< 3;k++){
                    //        $rootScope.appenName.push(dataList.data[k].enName);                  
                    //     }                                       
                    //  }
                                     
                    context.dataList = dataList;  
                    
                                                 
            });
        });
    });
    
    bizModel[bizAction]()
        .then((value)=>{
            
            var dataList = value && value.dataList && value.dataList;
            var dataListAth = angular.extend({},dataList);
            

            if (!dataList) {
                context.dataList =null;
                return;
            }
            
            angular.isArray(dataList.data) && dataList.data.filter(function filterEmpty(value) {//过滤为空的情况
                return Object.keys(value.dataPoints).length > 0;
            });
            
            // if ($rootScope&&$rootScope.showAppFilter) {
            //     $rootScope.fs_dataList = angular.extend({},dataList);
            // }
                   
            // if(angular.isArray(dataList.data)&&$rootScope.showAppFilter){//默认显示前三个应用
            //     dataList.data = dataList.data.slice(0,3);//todo                
            //     $rootScope.appenName = [];
            //     for (var k = 0;k< 3;k++){
            //         $rootScope.appenName.push(dataList.data[k].enName);                  
            //     }
            //     if($rootScope.showInfo){
            //         $rootScope.showAppFilter = false;   
            //     }         
            // }
             
            //  if($rootScope.showInfo){
            //     context.dataList = dataListAth; 
            //     $rootScope.showInfo = false;               
            //     return;
            // }
     
            context.dataList = dataList;                                                        
        });
}
