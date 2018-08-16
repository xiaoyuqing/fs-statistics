//import simplelist from "./directives/simplelist";
//import linechart from "./directives/graphlist/linechart";
//import infolist from "./directives/infolist";


/*factorys*/
import interceptor from "./factorys/interceptor";

/*filters*/
import generalAdapter from "./filters/generalAdapter";

/*services*/
import days from "./services/days";
import amount from "./services/amount";


export default angular.module(
    "commoms", 
        [
            /*simplelist, infolist, linechart,*/
            interceptor,
            generalAdapter,
            days, amount
        ]
    ).name;
