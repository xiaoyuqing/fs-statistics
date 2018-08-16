import simplelistDirective from "./directives/simplelist";

export default angular.module('simplelist.directive', [])
  .directive('simplelist', simplelistDirective)
  .name;