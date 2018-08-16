import daysService from "./days";

export default angular.module("services.days", [])
	.service("daysService", daysService)
	.name;