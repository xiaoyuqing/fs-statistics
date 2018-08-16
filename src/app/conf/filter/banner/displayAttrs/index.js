import displayAttrs from "./displayAttrs";

export default angular.module("filters.banner.displayAttrs", [])
    .filter("displayAttrsFilter", () => displayAttrs)
    .name;