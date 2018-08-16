import template from "../templates/tablecell.tpl";
import tableCellController from "../controllers/tablecell";

export default function tablecell(EventBus) {
	return {
		template: template,
		restrict: "AE",
		replace: true,
		scope: {
		    showDonut: '=showDonut'
		},
		controller: tableCellController,
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

tablecell.$inject = ['EventBus'];
