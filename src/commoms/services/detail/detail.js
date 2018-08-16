import getCommomData from "../_utils/getCommomData";
import getNavName from "../_utils/getNavName";

export default function detailService($injector,$window, $rootScope, $http, $location, $filter, $q, toastService) {

    var BIZTYPE = $injector.get('BIZTYPE');
    var APICONF = $injector.get('APICONF').detail;
    var DATAMAP = $injector.get('DATAMAP');

    var search = $location.search();
    var stat_date = search.stat_date;
    var statDate = new Date(stat_date.replace(/-/g,'/'));//Object的类型
    var copyDate = angular.copy(statDate);
    var dataMapType = 'detailMapList';

    //7天前以及30天前的日期 yyyy-MM-dd
    var weekStartDate = $filter('date')(new Date(statDate.setDate(statDate.getDate() - 6)),'yyyy-MM-dd');
    var monthStartDate = $filter('date')(new Date(copyDate.setDate(copyDate.getDate() - 29)),'yyyy-MM-dd');

    //得到一周的数据  
    this.getWeekLists = function getWeekLists(eData){

    eData = angular.extend({},$rootScope.obserData,eData);

    getNavName(eData, APICONF,'typeName');

    var apiParams = angular.extend({
        "startDate": weekStartDate,//7天后的日期
        "endDate": stat_date       
      }, eData);
    var apiOption = {data: apiParams};

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

        getNavName(eData, APICONF,'typeName');

        var apiParams = angular.extend({
                "startDate": monthStartDate,
                "endDate": stat_date               
            }, eData);
        var apiOption = {data: apiParams};

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
    
    //得到总的数据
    this.getAmountLists = function getAmountLists(eData) {

        eData = angular.extend({},$rootScope.obserData,eData);

        getNavName(eData, APICONF,'typeName');

        var apiParams = angular.extend({
            "startDate": "",
            "endDate": stat_date            
        }, eData);
        var apiOption = {data: apiParams};

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
                numbers: 40,
                type: 'amount'
            }        
        })
    }
}

detailService.$inject = ['$injector','$window', '$rootScope', '$http', '$location', '$filter' ,'$q', 'toastService'];
