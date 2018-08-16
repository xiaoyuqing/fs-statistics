export default function dataList(input) {
    var dataPoints = {
    	    "n_click_times":"PV",
            "n_click_member":"UV",
            "n_click_ea_member":"日活企业",
            "n_click_new_member":"新增用户",
            "n_click_new_ea_member":"新增企业",
            "n_click_ea_member_total":"累计使用企业",
            "n_click_member_total":"UV",
            "n_click_times_total":"PV",
            "n_click_times_app":"使用次数",
            "n_click_member_app":"活跃用户数",
            "n_click_member_app_total":"活跃用户数",
            "n_click_times_app_total":"使用次数"
            };
    

    return dataPoints[input];
}
