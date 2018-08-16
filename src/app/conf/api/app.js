export default {
    mock: {
        amount: {
            method: 'GET',
            url: '/data/app/totalData.json',
            data: {
                businessName: 'app_usage_web'
            } 
        },

        days: {
            method: 'GET',
            url: '/data/app/dataList.json',
            data: {
                businessName: 'app_usage_web'
            }
        }
    },  

    dev: {
        amount: {
            method: 'POST',
            url: '/open/operation/api/getAppUsageTotalData',
            cache: true,
            data: {
                businessName: 'app_usage_app'
            }
        },

        days: {
            method: 'POST',
            url: '/open/operation/api/getAppUsageDataList',
            cache: true,
            data: {
                /*startPos: 1,
                count: 2,*/
                businessName: 'app_usage_app'
            }
        }
    }
    
}