import template from "../templates/infocell.tpl";
import infoCellController from "../controllers/infocell";
export default function infocell($timeout, $window, EventBus,$rootScope) {
	return {
		template: template,
		restrict: "AE",
		replace: true,
		scope:{showInfo:'@showInfo'},
		controller: infoCellController,
		controllerAs: "vm",
		link:function(scope, element){
			var wh = $window['innerHeight'];//window高度
			var initElHandle = $timeout(()=>{
			    element[0].style['minHeight'] = wh + 'px';
			}, 100);
                      
            $rootScope.showInfo = scope.showInfo;//筛选的时候能够把详细信息显示出来
          

			scope.$on("$destroy",function() {
                    $timeout.cancel( initElHandle );

                    //销毁绑定的自定义事件(以免造成内存泄漏)
                    EventBus.del('fs-filter-exclude');
                    EventBus.del('fs-filter-category');

                }
            );
		}
	}
}

infocell.$inject = ['$timeout', '$window', 'EventBus','$rootScope'];