import template from "../templates/histchart.tpl";
import histChartController from "../controllers/histchart";

export default function histchart(EventBus) {
	return {
		template: template,
		restrict: "AE",
		replace: true,
		controller: histChartController,
		controllerAs: "vm",
		scope: {
          showFilterDate:'@showFilterDate',
          bizType:'@bizType',
          showCallTop:'@showCallTop'
        },
		link: function(scope){
			scope.$on('$destroy', function(){
				//销毁绑定的自定义事件(以免造成内存泄漏)
				EventBus.del('fs-filter-exclude');
				EventBus.del('fs-filter-category');
				EventBus.del('fs-filter-rank');
				EventBus.del('fs-filter-call');
			});		
		}

	}
}

histchart.$inject = ['EventBus'];
