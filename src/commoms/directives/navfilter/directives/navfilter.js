import '../css/navfilter.less';
import navFilterTpl from '../templates/navfilter.tpl';

export default function navfilter(EventBus, $rootScope) {
  return {
    replace:true,
    restrict: 'AE',
    scope: {
      cateList: '=cateData'
    },
    template: navFilterTpl,
    link(scope) {
      scope.$watch('cateList', function(cateData){
        var data = cateData.data;
        var key = cateData.key;
        var eventType = cateData.eventType;
        $rootScope.obserData = $rootScope.obserData || {};             
        var tabState = {
          currTab: data[0]['name'],

          onTabHandle(e,index, cate){            
            e.preventDefault();
            e.stopPropagation();
            this.currTab = cate['name'];

            var fireObj = {
              type: eventType
            }
            fireObj['data'] = {};
            fireObj['data'][key] = cate['name'];

            EventBus.fire(fireObj);
            
            $rootScope.obserData = $rootScope.obserData || {};
            $rootScope.obserData[key] = cate['name'];

          },

          getItemW(){
            return 100/(data.length+1);
          }
        }
        scope.tabState = tabState; 
        if($rootScope.obserData[key]){       
             scope.tabState.currTab = $rootScope.obserData[key];
        }
        
      })
    }
  }
}

navfilter.$inject = ['EventBus', '$rootScope'];