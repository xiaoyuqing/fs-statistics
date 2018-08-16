/*1.   getSessionServiceDataList   参数和原来不变  business_name：session_service
2.   getSessionServiceTotalData  参数和原来一致， 返回数据 attrs中n_defined_service_ea_distribution，n_active_service_ea_distribution分别代表那两个饼图
3.  getSessionServiceDetailData  参数多了一个type:  all:全部；official:官方；self:自建  startDate总览时不要传*/

export default {
    mock: {
        amount: {
            method: 'GET',
            url: '/data/openapi/totalData.json',
            data: {
                businessName: 'app_usage_web'
            } 
        },

        days: {
            method: 'GET',
            url: '/data/openapi/dataList.json',
            data: {
                businessName: 'app_usage_web'
            }
        },

        detail:{
            method: 'GET',
            url: '/data/openapi/detailData.json',
            cache: true,
            data: {
                businessName: 'session_service',
                type:'all'
            }
        }

    },  

    dev: {
        amount: {
            method: 'POST',
            url: '/open/operation/api/getOpenApiTotalData',
            cache: true,
            data: {
                businessName: 'open_api_call',
                callType:'all'
            }
        },

        days: {
            method: 'POST',
            url: '/open/operation/api/getOpenApiDataList',
            cache: true,
            data: {
                businessName: 'open_api_call',
                callType:'all'
            }
        },
        detail_another:{
            method: 'POST',
            url: '/open/operation/api/getOpenApiInterfaceDetail',
            cache: true,
            data: {
                businessName: 'open_api_call_interface_detail_data',
                callType:'all',
                backType:'main_call'
            }
        },
        detail:{
            method: 'POST',
            url: '/open/operation/api/getOpenApiCorpDetail',
            cache: true,
            data: {
                businessName: 'open_api_call_corp_detail_data',
                callType:'all',
                backType:'main_call'
            }
        }
        
    }
    
}