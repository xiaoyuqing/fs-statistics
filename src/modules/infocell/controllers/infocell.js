import getModelData from '../../_utils/getModelData'

export default function infoCellController($rootScope, $attrs, $injector, $location, EventBus) {

	getModelData({
		$rootScope: $rootScope,
        EventBus: EventBus,
		context: this,
		bizModel: $injector.get($attrs.bizModel),
		bizAction: $attrs.bizAction,
		eventList: ['fs-filter-exclude', 'fs-filter-category']
	});
	
}

infoCellController.$inject = ['$rootScope', '$attrs', '$injector', '$location', 'EventBus'];

