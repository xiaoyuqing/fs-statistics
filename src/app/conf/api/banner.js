export default {
    mock: {
        amount: {
            method: 'GET',
            url: '/data/banner/totalData.json' 
        },

        days: {
            method: 'GET',
            url: '/data/banner/dataList.json'
        }
    },

    dev: {
        amount: {
            method: 'POST',
            url: '/open/operation/api/getTotalData',
            cache: true,
            data: {
                businessName: 'banner'
            }
        },

        days: {
            method: 'POST',
            url: '/open/operation/api/getDataList',
            cache: true,
            data: {
                businessName: 'banner'
            }
            
        }
    }
    
}