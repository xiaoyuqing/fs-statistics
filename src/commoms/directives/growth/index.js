import growthDirective from "./directives/growth";

export default angular.module('growth.directive', [])
  .directive('growth', growthDirective)
  .name;