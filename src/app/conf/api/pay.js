export default {
	mock: {
		amount: {
			method: 'GET',
			url: '/data/pay/totalData.json'	
		},

		days: {
			method: 'GET',
			url: '/data/pay/dataList.json'
		}
	},

	dev: {
		amount: {
			method: 'POST',
			url: '/open/operation/api/getPayTotalData',
			cache: true,
            data: {
                businessName: 'pay'
            }	
		},

		days: {
			method: 'POST',
			url: '/open/operation/api/getPayDataList',
			cache: true,
            data: {
                businessName: 'pay'
            }
		}
	}
	
}