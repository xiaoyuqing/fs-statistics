import dataPoints from "./dataPoints/index";
import displayAttrs from "./displayAttrs/index";

export default angular.module("filters.banner", 
    [dataPoints, displayAttrs])
    .name;