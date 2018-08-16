//饼状图
import donutchartDirective from "./directives/donutchart";

export default angular.module('commoms.directive.graphlist.donutchart', ['nvd3'])
  .directive('donutchart', donutchartDirective)
  .name;