import dataPoints from "./dataPoint";

export default angular.module("filters.banner.dataPoints", [])
    .filter("dataPointsFilter", () => dataPoints)
    .name;