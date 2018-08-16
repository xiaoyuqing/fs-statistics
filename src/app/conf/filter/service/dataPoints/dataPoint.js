export default function dataList(input) {
    var dataPoints = {
        //list data
        //单天
    	"n_enter_session_service": "进入服务号次数",
        "n_message_click_ea_member": "图文消息点击企业数",
        "n_active_ea_member": "前后端活跃企业数",
        "n_enter_session_service_ea_member": "进入服务号企业数",
        "n_sent_message_down_receiver": "下发消息接受人数",
        "n_message_click_member": "图文消息点击人数",
        "n_menu_click": "菜单点击数",
        "n_message_click": "图文消息点击次数",
        "n_menu_click_member": "菜单点击人数",
        "n_menu_click_ea_member": "菜单点击企业数",
        "n_sent_message_down_ea_member": "下发消息企业数",
        "n_sent_message_up_ea_member": "发送上行消息企业数",
        "n_sent_message_up": "用户上行消息次数",
        "n_sent_message_up_member": "发送上行消息人数",
        "n_sent_message_down": "下发消息次数",
        "n_enter_session_service_member": "进入服务号人数",
       
        "n_active_client_ea_member":"客户端活跃企业数",
        "n_active_client_member":"客户端活跃用户数",

        "n_active_defined_service":"自建服务号数",
        "n_active_defined_service_ea_member":"自建服务号企业数",
    


        //总览
        "n_enter_session_service_total": "进入服务号次数",
        "n_message_click_ea_member_total": "图文消息点击企业数",
        "n_active_ea_member_total": "前后端活跃企业数",
        "n_enter_session_service_ea_member_total": "进入服务号企业数",
        "n_sent_message_down_receiver_total": "下发消息接受人数",
        "n_message_click_member_total": "图文消息点击人数",
        "n_menu_click_total": "菜单点击数",
        "n_message_click_total": "图文消息点击次数",
        "n_menu_click_member_total": "菜单点击人数",
        "n_menu_click_ea_member_total": "菜单点击企业数",
        "n_sent_message_down_ea_member_total": "下发消息企业数",
        "n_sent_message_up_ea_member_total": "发送上行消息企业数",
        "n_sent_message_up_total": "用户上行消息次数",
        "n_sent_message_up_member_total": "发送上行消息人数",
        "n_sent_message_down_total": "下发消息次数",
        "n_enter_session_service_member_total": "进入服务号人数",

        "n_active_client_ea_member_total":"客户端活跃企业数",
        "n_active_client_member_total":"客户端活跃用户数",       
        "n_active_defined_service_total":"自建服务号数",
        "n_active_defined_service_ea_member_total":"自建服务号企业数",
        "n_total_ea_rate_total":"月活服务号渗透率",
        "n_total_member_total":"服务号累积使用人数"

        
    };

    return dataPoints[input];
}