import linechartDirective from "./directives/linechart";

export default angular.module("modules.graph.linechart", [])
	.directive('fsLineChartCell', linechartDirective)
	.name;    