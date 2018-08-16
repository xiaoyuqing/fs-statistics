import histChartDirective from "./directives/histchart";

export default angular.module("modules.graph.histogramDonutcell", [])
	.directive('fsHistogramCell', histChartDirective)
	.name;    