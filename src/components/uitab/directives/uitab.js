export default function uiTab($rootScope, $state) {
    return {
      restrict: 'AE',
      replace: true,
      scope: {
        tabs: '=data',
        listClass: '@',
        itemClass: '@'
      },
      link: function(scope) {

        var updateTabs = function() {
          scope.update_tabs();
        };

        var unbindStateChangeSuccess = $rootScope.$on('$stateChangeSuccess', updateTabs);
        var unbindStateChangeError = $rootScope.$on('$stateChangeError', updateTabs);
        var unbindStateChangeCancel = $rootScope.$on('$stateChangeCancel', updateTabs);
        var unbindStateNotFound = $rootScope.$on('$stateNotFound', updateTabs);

        scope.$on('$destroy', unbindStateChangeSuccess);
        scope.$on('$destroy', unbindStateChangeError);
        scope.$on('$destroy', unbindStateChangeCancel);
        scope.$on('$destroy', unbindStateNotFound);
      },
      controller: ['$scope', function($scope) {

        if (!$scope.tabs) {
          throw new Error('UI Router Tabs: \'data\' attribute not defined, please check documentation for how to use this directive.');
        }

        if (!angular.isArray($scope.tabs)) {
          throw new Error('UI Router Tabs: \'data\' attribute must be an array of tab data with at least one tab defined.');
        }

        var currentStateEqualTo = function(tab) {

          var isEqual = $state.is(tab.route, tab.params, tab.options);
          return isEqual;
        };

        $scope.go = function(tab) {

          if (!currentStateEqualTo(tab) && !tab.disable) {

            if ((tab.route.indexOf('modules.graph') >= 0)&& (!window['d3'] || !window['nv'])) {
              getFsResource.injectScripts({
                preload: ['d3','nv']
              },function() {
                $state.go(tab.route, tab.params, tab.options);
              });
            }else{
              $state.go(tab.route, tab.params, tab.options);
            }
            
          }
        };

        /* whether to highlight given route as part of the current state */
        $scope.active = function(tab) {

          var isAncestorOfCurrentRoute = $state.includes(tab.route, tab.params, tab.options);
          return isAncestorOfCurrentRoute;
        };

        $scope.update_tabs = function() {
          
          // sets which tab is active (used for highlighting)
          angular.forEach($scope.tabs, function(tab) {
            tab.params = tab.params || {};
            tab.options = tab.options || {};
            tab.active = $scope.active(tab);
          });
        };

        $scope.update_tabs();
      }],
      templateUrl: function(element, attributes) {
        return attributes.templateUrl || 'ui-router-tabs-default-template.html';
      }
    };
}

uiTab.$inject = ['$rootScope', '$state'];
