//折线图
import linechartDirective from "./directives/linechart";

export default angular.module('commoms.directive.graphlist.linechart', ['nvd3'])
  .directive('linechart', linechartDirective)
  .name;