import template from "../templates/linechart.tpl";
import linechartController from "../controllers/linechart";

export default function linechart(EventBus) {
	return {
		template: template,
		restrict: "AE",
		replace: true,
		scope: {
		    showGrowth: '=showGrowth'
		},
		controller: linechartController,
		controllerAs: "vm",
		link: function(scope){
			scope.$on('$destroy', function(){
				//销毁绑定的自定义事件(以免造成内存泄漏)
				EventBus.del('fs-filter-exclude');
				EventBus.del('fs-filter-category');
				EventBus.del('fs-filter-app');
				EventBus.del('fs-filter-call');
			});
		}

	}
}

linechart.$inject = ['EventBus'];
