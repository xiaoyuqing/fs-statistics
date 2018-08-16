import getNavName from "../_utils/getNavName";
import getCommomData from "../_utils/getCommomData";

export default function daysService($injector,$window, $rootScope, $http, $location, $filter, $q, toastService) {

    var BIZTYPE = $injector.get('BIZTYPE');
    var APICONF = $injector.get('APICONF').days;
    var DATAMAP = $injector.get('DATAMAP');

    var search = $location.search();
    var stat_date = search.stat_date;
    var statDate = new Date(stat_date.replace(/-/g,'/'));//Object的类型
    var copyDate = angular.copy(statDate);
    var dataMapType = 'dataMapList';

    //7天前以及30天前的日期 yyyy-MM-dd
    var weekStartDate = $filter('date')(new Date(statDate.setDate(statDate.getDate() - 6)),'yyyy-MM-dd');
    var monthStartDate = $filter('date')(new Date(copyDate.setDate(copyDate.getDate() - 29)),'yyyy-MM-dd');

    //得到每天的数据
    this.getDataList = function getDataList(eData){
        eData = angular.extend({},$rootScope.obserData,eData);

        getNavName(eData, APICONF,'businessName');

        var apiParams = angular.extend({
            "startDate": stat_date,
            "endDate": stat_date
        }, eData);

        var apiOption = {data: apiParams};
        if(eData.businessName =="app_usage_web"){
            dataMapType = 'dataMapListWeb';
        }else if(eData.businessName =="app_usage_app"){
            dataMapType = 'dataMapList';
        }

        return getCommomData({
            $http: $http,
            $filter: $filter,
            $rootScope: $rootScope,
            toastService: toastService,
            BIZTYPE: BIZTYPE,
            APICONF: APICONF, 
            DATAMAP: DATAMAP,
            apiOption: apiOption,
            dataMapType: dataMapType,
            loadJS: function(){
                basket.require({"url": FS.asset.js.d3,"key": "d3","unique": "v1"});
                basket.require({"url": FS.asset.js.nv,"key": "nv-d3","unique": "v2.2"});
            }
        });
    }

    //得到一周的数据  
    this.getWeekLists = function getWeekLists(eData){

        eData = angular.extend({},$rootScope.obserData,eData);

        getNavName(eData, APICONF,'businessName');

        var apiParams = angular.extend({
            "startDate": weekStartDate,//7天后的日期
            "endDate": stat_date
        }, eData);

        var apiOption = {data: apiParams};
        if(eData.businessName =="app_usage_web"){
            dataMapType = 'dataMapListWeb';
        }else if(eData.businessName =="app_usage_app"){
            dataMapType = 'dataMapList';
        }

        return getCommomData({                
            $http: $http, 
            $filter: $filter, 
            $rootScope: $rootScope, 
            toastService: toastService, 
            BIZTYPE: BIZTYPE, 
            APICONF: APICONF, 
            DATAMAP: DATAMAP,
            apiOption: apiOption, 
            dataMapType: dataMapType,
            cellType : {
                numbers: 7,
                type: 'week'
            }
        });
    }

    //得到一月的数据  
    this.getMonthLists = function getMonthLists(eData) {

        eData = angular.extend({},$rootScope.obserData,eData);

        getNavName(eData, APICONF,'businessName');

        var apiParams = angular.extend({
            "startDate": monthStartDate,
            "endDate": stat_date
        }, eData);
        var apiOption = {data: apiParams};
        if(eData.businessName =="app_usage_web"){
            dataMapType = 'dataMapListWeb';
        }else if(eData.businessName =="app_usage_app"){
            dataMapType = 'dataMapList';
        }

        return getCommomData({
            $http: $http, 
            $filter: $filter, 
            $rootScope: $rootScope, 
            toastService: toastService, 
            BIZTYPE: BIZTYPE, 
            APICONF: APICONF, 
            DATAMAP: DATAMAP,
            apiOption: apiOption, 
            dataMapType: dataMapType,
            cellType : {
                numbers: 30,
                type: 'month'
            }
        });

    }
      
}

daysService.$inject = ['$injector','$window', '$rootScope', '$http', '$location', '$filter' ,'$q', 'toastService'];
