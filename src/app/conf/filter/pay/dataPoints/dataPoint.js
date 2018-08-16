export default function dataList(input) {
    var dataPoints = {
        //list data
        //reward
        'reward_ea_member':'打赏企业数',
        'reward_member':'打赏人数',
        'reward_success_num':'打赏成功次数',
        'reward_ios_success_num':'iOS打赏成功次数',
        'reward_android_success_num':'Android打赏成功次数',
        'reward_web_success_num':'Web打赏成功次数',
        'reward_money':'打赏金额',
        'reward_fail_num':'打赏失败次数',
        'reward_shared_num':'分享的打赏次数',
        'reward_diary_num':'日志的打赏次数',
        

    	//wallet
        'n_wallet_bind_card': '绑卡数',
        'n_wallet_bind_member': '绑卡人数',
        'n_wallet_unbind_card': '解绑卡数',
        'n_wallet_bind_card_fail': '绑卡失败次数',
        
        


        //bonus
        'n_bonus_send_num': '发红包数',
        'n_bonus_send_member': '发红包人数',
        'n_bonus_send_money': '发红包金额',
        'n_bonus_receive_num': '领红包数',
        'n_bonus_receive_member': '领红包人数',
        'n_bonus_receive_money': '领红包金额',
        'n_bonus_back_num': '退款红包数',
        'n_bonus_back_money': '退款红包金额',
        
        


        //account
        'n_account_weixin_recharge_money': '微信充值金额',
        
        'n_account_kq_recharge_money': '快钱充值金额',
        
        'n_account_day_recharge_money': '充值总金额',
        
        'n_account_day_cash_money': '总提现金额',
        'n_account_day_cash_num': '总提现笔数',
        
        

        //total data

        //reward
        'reward_ea_member_total':'总打赏企业数',
        'reward_member_total':'总打赏人数',
        'reward_success_num_total':'总打赏成功次数',
        'reward_ios_success_num_total':'总iOS打赏成功次数',
        'reward_android_success_num_total':'总Android打赏成功次数',
        'reward_web_success_num_total':'总Web打赏成功次数',
        'reward_money_total':'总打赏金额',
        'reward_fail_num_total':'总打赏失败次数',
        'reward_shared_num_total':'分享的总打赏次数',
        'reward_diary_num_total':'日志的总打赏次数',
        
        //wallet
        'n_wallet_bind_card_total': '绑卡数',
        'n_wallet_bind_member_total': '绑卡人数',
        'n_wallet_unbind_card_total': '解绑卡数',
        'n_wallet_bind_card_fail_total': '绑卡失败次数',
        
        


        //bonus
        'n_bonus_send_num_total': '发红包数',
        'n_bonus_send_member_total': '发红包人数',
        'n_bonus_send_money_total': '发红包金额',
        'n_bonus_receive_num_total': '领红包数',
        'n_bonus_receive_member_total': '领红包人数',
        'n_bonus_receive_money_total': '领红包金额',
        'n_bonus_back_num_total': '退款红包数',
        'n_bonus_back_money_total': '退款红包金额',
        
        


        //account
        'n_account_weixin_recharge_money_total': '微信充值金额',
        
        'n_account_kq_recharge_money_total': '快钱充值金额',
        
        'n_account_day_recharge_money_total': '充值总金额',
        
        'n_account_day_cash_money_total': '总提现金额',
        'n_account_day_cash_num_total': '总提现笔数'
        
        
    };

    return dataPoints[input];
}