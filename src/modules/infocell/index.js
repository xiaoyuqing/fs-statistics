import infoCellDirective from "./directives/infocell";
export default angular.module("modules.infocell", [])
	.directive('fsInfoCell', infoCellDirective)
	.name;