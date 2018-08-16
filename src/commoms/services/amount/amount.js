import getNavName from "../_utils/getNavName";
import getCommomData from "../_utils/getCommomData";

export default function amountService($injector,$http, $location, $filter, $rootScope, toastService) {
    
    var BIZTYPE = $injector.get('BIZTYPE');
    var APICONF = $injector.get('APICONF').amount;
    var DATAMAP = $injector.get('DATAMAP');
    var search = $location.search();   
    var dataMapType = 'amountMapList';

    this.getDataList = function getDataList(eData){

        eData = angular.extend({},$rootScope.obserData,eData);

        getNavName(eData, APICONF, 'businessName');

        var params = angular.extend({
            "endDate": search.stat_date
        }, eData);

        if(eData.businessName =="app_usage_app"){
            dataMapType = 'amountMapList';
        }else if(eData.businessName =="app_usage_web"){
            dataMapType = 'amountMapListWeb';
        }
       
        var apiOption = {data: params};

        return getCommomData({
            $http: $http, 
            $filter: $filter, 
            toastService: toastService, 
            DATAMAP: DATAMAP,
            BIZTYPE: BIZTYPE, 
            APICONF: APICONF, 
            apiOption: apiOption, 
            dataMapType: dataMapType
        });

    }

}


amountService.$inject = ['$injector','$http','$location', '$filter', '$rootScope', 'toastService'];


