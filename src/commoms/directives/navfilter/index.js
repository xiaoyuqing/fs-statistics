import navFilterDirective from "./directives/navfilter";

export default angular.module('navfilter.directive', [])
  .directive('navfilter', navFilterDirective)
  .name;  