import transTitle from "./title";

export default angular.module("filters.translate", [])
	.filter("transTitle", () => transTitle)
	.name;