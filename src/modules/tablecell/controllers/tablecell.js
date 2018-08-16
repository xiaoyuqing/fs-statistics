import getModelData from '../../_utils/getModelData'

export default function tableCellController($state,$rootScope, $timeout, $scope, $attrs, $injector, EventBus) {
    

	getModelData({
        $rootScope: $rootScope,
        routerStart: true,
		EventBus: EventBus,
		context: this,
		bizModel: $injector.get($attrs.bizModel),
		bizAction: $attrs.bizAction,
		eventList: ['fs-filter-exclude', 'fs-filter-call','fs-filter-category','fs-filter-app']
	});

}

tableCellController.$inject = ['$state', '$rootScope', '$timeout', '$scope', '$attrs', '$injector', 'EventBus'];