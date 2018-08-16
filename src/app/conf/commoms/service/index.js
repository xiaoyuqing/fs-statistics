//directives
import histogramchat from "commoms/directives/graphlist/histogramchat";
//import donutChart from "commoms/directives/graphlist/donutchart";
//import growth from "commoms/directives/growth";
//import navFilter from "commoms/directives/navfilter";
//import rankList from "commoms/directives/ranklist";

//services
import detailservice from "commoms/services/detail";
import detailanotherservice from "commoms/services/detail_another";

export default angular.module(
    "commoms.service", 
        [
            histogramchat,detailservice,detailanotherservice/*,donutChart,growth,navFilter,detailservice/*,rankList*/
        ]
    ).name;
