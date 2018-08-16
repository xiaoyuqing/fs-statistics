import infolistDirective from "./directives/infolist";

export default angular.module('infolist.directive', [])
  .directive('infolist', infolistDirective)
  .name;  