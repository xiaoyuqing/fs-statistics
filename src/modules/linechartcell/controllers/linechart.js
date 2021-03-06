import getModelData from '../../_utils/getModelData'

export default function lineChartController($rootScope, $scope, $attrs, $injector, EventBus) {

	getModelData({
		$rootScope:$rootScope,
        EventBus: EventBus,
        context: this,
        bizModel: $injector.get($attrs.bizModel),
        bizAction: $attrs.bizAction,
		eventList: ['fs-filter-exclude','fs-filter-call', 'fs-filter-category','fs-filter-app']
	});
					
}

lineChartController.$inject = ['$rootScope', '$scope', '$attrs', '$injector', 'EventBus'];

