import dataPoints from "./dataPoint";

export default angular.module("filters.service.dataPoints", [])
    .filter("dataPointsFilter", () => dataPoints)
    .name;