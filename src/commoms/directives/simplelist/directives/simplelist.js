import "../css/simplelist.less"
import simpleTpl from '../templates/simplelist.tpl';

export default function simplelist() {
  return {
    replace:true,
    restrict: 'AE',
    scope: {
      dataList: '=list'
    },
    template: simpleTpl,
    link: function(scope){
        scope.getDataMapItem = function(dataList, $index){
          return dataList.boolString(dataList.dataMap['dataPoints'][0]) ? dataList.dataMap['dataPoints'] : dataList.dataMap['dataPoints'][$index];
        }      
    }
  }
}

simplelist.$inject = ['$rootScope'];