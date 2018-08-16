import amountsService from "./amount";

export default angular.module("services.amount", [])
	.service("amountsService", amountsService)
	.name;