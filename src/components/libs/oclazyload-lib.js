export default {
	loadModules: function($ocLazyLoad, list){
		list = angular.isArray(list) ? list : [list];

		var modules = [];

		angular.forEach(list, function(item) {
			modules.push({
				'name': item.default
			})
		});
		return $ocLazyLoad.load(modules);
	},
	dedupe: function($ocLazyLoad, source){
		if (!$ocLazyLoad.isLoaded(source)) {
			$ocLazyLoad.load(source)
		}
	}
}