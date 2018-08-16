export default function dataList(input) {
    var dataPoints = {
        //list data
        //单天
    	"n_total_call":"接口调用总数",
        "n_total_call_ea_member":"接口调用企业数",
        "n_total_call_fail":"失败次数",

        "n_main_call":"调用次数",
        "n_main_call_fail":"失败次数",
        "n_main_call_ea_member":"调用企业数",
        "n_main_call_success":"成功次数",


        "n_call_back": "推送次数",
        "n_call_back_success":"推送成功次数",
        "n_call_back_fail":"推送失败次数",
        "n_call_back_ea_member":"推送企业数",


        //总览
        "n_total_call_fail_total": "失败次数",
        "n_total_call_ea_member_total": "接口调用企业数",
        "n_total_call_total": "接口调用总数",

        "n_main_call_total": "调用次数",
        "n_main_call_success_total": "成功次数",
        "n_main_call_ea_member_total": "调用企业数",
        "n_main_call_fail_total": "失败次数",

        "n_call_back_ea_member_total": "推送企业数",
        "n_call_back_success_total": "推送成功次数",
        "n_call_back_total": "推送次数",
        "n_call_back_fail_total": "推送失败次数",

        "n_call":"调用次数",
        "n_call_fail":"调用失败数",
        "n_call_success":"调用成功数",
        "n_call_ea_member":"调用企业数"
       

        
    };

    return dataPoints[input];
}