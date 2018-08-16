import dataPoints from "./dataPoints";

export default angular.module("filters.banner.dataPoints", [])
    .filter("dataPointsFilter", () => dataPoints)
    .name;