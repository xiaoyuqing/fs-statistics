import TopNavDirective from "./directives/topnav";

export default angular.module("modules.topnav", [])
	.directive('fsTopNav', TopNavDirective)
	.name;  