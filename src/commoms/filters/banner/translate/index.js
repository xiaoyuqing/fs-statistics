import transTitle from "./title";

export default angular.module("filters.banner.translate", [])
	.filter("transTitle", () => transTitle)
	.name;