import toastService from "./services/toast";

export default angular.module("components.toast", [])
	.service("toastService", toastService)
	.name;