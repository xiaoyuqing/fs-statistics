import tableCellDirective from "./directives/tablecell";
export default angular.module("modules.tablecell", [])
	.directive('fsTableCell', tableCellDirective)
	.name;  