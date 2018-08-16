import loadingmoreDirective from "./directives/loadingmore";

export default angular.module('loadingmore.directive', [])
  .directive('loadingmore', loadingmoreDirective)
  .name;  