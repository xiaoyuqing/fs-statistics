// 自定义的柱状图( 没有使用d3 画图工具)
import selfHistogramDirective from "./directives/selfhistogram";

export default angular.module('commoms.directive.graphlist.selfHistogram', [])
  .directive('selfhistogramchat', selfHistogramDirective)
  .name;  