import getCommomData from "../_utils/getCommomData";
import getNavName from "../_utils/getNavName";

export default function detailAnotherService($injector,$window, $rootScope, $http, $location, $filter, $q, toastService) {

    var BIZTYPE = $injector.get('BIZTYPE');
    var APICONF = $injector.get('APICONF').detail_another;
    var DATAMAP = $injector.get('DATAMAP');

    var search = $location.search();
    var stat_date = search.stat_date;
    
    var dataMapType = 'detailAnotherMapList';

    

    

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
                type: 'amountath'
            }        
        })
    }

    
}

detailAnotherService.$inject = ['$injector','$window', '$rootScope', '$http', '$location', '$filter' ,'$q', 'toastService'];
