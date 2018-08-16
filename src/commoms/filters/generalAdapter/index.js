import generalAdapter from "./generalAdapter";

export default angular.module("filters.commom.generalAdapter", [])
    .filter("generalAdapter", () => generalAdapter)
    .name;