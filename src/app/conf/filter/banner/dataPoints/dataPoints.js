export default function dataList(input) {
    var dataPoints = {
        "n_banner_click_times": "PV",
        "n_banner_click_member": "UV", 
        "n_banner_click_ea_member": "点击企业数",

        "n_banner_click_times_total": "PV", 
        "n_banner_click_member_total": "UV", 
        "n_banner_click_ea_member_total": "点击企业数"
   
    };

    return dataPoints[input];
}