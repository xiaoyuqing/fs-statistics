import '../css/infolist.less';
import infoTpl from '../templates/infolist.tpl';

export default function infolist($location) {
  return {
    replace:true,
    restrict: 'AE',
    scope: {
      dataList: '=list'
    },
    template: infoTpl,
    link(scope) {
      var search = $location.search();
      var type = search.type;

      scope.$watch('dataList', function (newVal) {
        if (newVal && newVal.dataMap && newVal.data) {
          var dataPoints = newVal.data[type].dataPoints;
          var pointKeys = Object.keys(dataPoints);
          scope.firstItem = dataPoints && dataPoints[pointKeys[0]];
          scope.dataList = dataPoints;
          scope.dataMapItem = newVal.boolString(newVal.dataMap['dataPoints'][0]) ? newVal.dataMap['dataPoints'] : newVal.dataMap['dataPoints'][type];
        }
      }, true)
    }
  }
}


infolist.$inject = ['$location'];