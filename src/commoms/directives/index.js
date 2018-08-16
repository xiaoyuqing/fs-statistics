import simplelist from "./simplelist";
import brokenline from "./graphlist/brokenline";
import infolist from "./infolist";

export default angular.module("commom.directives", 
	[simplelist, brokenline, infolist])
	.name;