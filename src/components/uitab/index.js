import defaultTpl from "./templates/default.tpl";
import uitab from "./directives/uitab";


export default angular.module("components.uitab", [])
	.directive('tabs', uitab)
	.run(
  	['$templateCache', function($templateCache) {
  	    var DEFAULT_TEMPLATE = defaultTpl;
  	    $templateCache.put('ui-router-tabs-default-template.html', DEFAULT_TEMPLATE);
  	}])
	.name;