import modules from 'modules'
import api from './conf/api/pay'
import mapFilter from './conf/filter/pay'
import dataMaps from './conf/map/pay'

import commoms from 'commoms/general'
import components from 'components/general'
import ocLazyloadLib from 'components/libs/oclazyload-lib'
import tody from 'commoms/utils/date/today'

// 初始化App的相关模块引入
import 'components/libs/fastclick-attach'

import 'assets/css/reset.less'
import 'libs/nv.d3.css'
import 'commoms/directives/graphlist/css/dropdown.less'

var apiConf = __MOCK__ ? api.mock : api.dev;
angular.module('fs.pay', [
	'oc.lazyLoad',
	'ui.router',
	commoms,
	mapFilter,
	components,
	modules
	])
	.config(['$urlRouterProvider', '$stateProvider', '$httpProvider', '$ocLazyLoadProvider',
		($urlRouterProvider, $stateProvider, $httpProvider, $ocLazyLoadProvider) => {
			$ocLazyLoadProvider.config({
				debug:false,
				events:false
			});	

			$httpProvider.interceptors.push('httpInterceptor');

			$urlRouterProvider.otherwise('/now?stat_date=' + tody() );

			$stateProvider
				.state('modules', {
					abstract: true,
					template: `<fs-top-nav></fs-top-nav>`
				})
				.state('modules.now', {
				  	url: '/now?stat_date',
				  	template: `<fs-table-cell biz-model='daysService' biz-action='getDataList'></fs-table-cell>`,
					resolve: {
						load: ['$q', '$ocLazyLoad',( $q, $ocLazyLoad ) => {
							
							var deferred = $q.defer(); 

							require.ensure([], (require) => {

								var tablecell = require('modules/tablecell');
								var simplelist = require('commoms/directives/simplelist');

								ocLazyloadLib.loadModules($ocLazyLoad,[tablecell,simplelist])

								deferred.resolve();

							}, 'tablecellModule');

							return deferred.promise;
						}]
					}			
				})
				.state('modules.amount', {
					url: '/amount?stat_date',
					template: `<fs-table-cell biz-model='amountsService' biz-action='getDataList'></fs-table-cell>`,
					resolve: {
						load: ['$q', '$ocLazyLoad',( $q, $ocLazyLoad ) => {
							
							var deferred = $q.defer(); 

							require.ensure([], (require) => {

								var tablecell = require('modules/tablecell');
								var simplelist = require('commoms/directives/simplelist');

								ocLazyloadLib.loadModules($ocLazyLoad,[tablecell,simplelist])

								deferred.resolve();

							}, 'tablecellModule');

							return deferred.promise;
						}]
					}
				})
				.state('modules.graphWeek', {
					url: '/week?stat_date',
					template: `<fs-line-chart-cell biz-model='daysService' biz-action='getWeekLists' ></fs-line-chart-cell>`,
					resolve: {
						load: ['$q', '$ocLazyLoad',( $q, $ocLazyLoad ) => {

							var deferred = $q.defer(); 

							require.ensure([], (require) => {

								
								var linechartcell = require('modules/linechartcell');

								var linechart = require('commoms/directives/graphlist/linechart');

								ocLazyloadLib.loadModules($ocLazyLoad,[linechartcell,linechart])

								deferred.resolve();

							}, 'linechartcellModule');

							return deferred.promise;
						}]
					}
				})
				.state('modules.graphMonth', {
					url: '/month?stat_date',
					template: `<fs-line-chart-cell biz-model='daysService' biz-action='getMonthLists'></fs-line-chart-cell>`,
					resolve: {
						load: ['$q', '$ocLazyLoad',( $q, $ocLazyLoad ) => {

							var deferred = $q.defer(); 

							require.ensure([], (require) => {

								var linechartcell = require('modules/linechartcell');

								var linechart = require('commoms/directives/graphlist/linechart');

								ocLazyloadLib.loadModules($ocLazyLoad,[linechartcell,linechart])

								deferred.resolve();

							}, 'linechartcellModule');

							return deferred.promise;
						}]
					}
				})
				.state('weekinfo',{
					url: '/weekinfo?stat_date&type',
					template: `<fs-info-cell biz-model='daysService' biz-action='getWeekLists'></fs-info-cell>`,
					resolve: {
						load: ['$q', '$ocLazyLoad',( $q, $ocLazyLoad ) => {

							var deferred = $q.defer(); 

							require.ensure([], (require) => {

								var infocell = require('modules/infocell');

								var infolist = require('commoms/directives/infolist');

								ocLazyloadLib.loadModules($ocLazyLoad,[infocell,infolist])

								deferred.resolve();

							}, 'infoCellModule');

							return deferred.promise;
						}]
					}
				})
				.state('monthinfo',{
					url: '/monthinfo?stat_date&type',
					template: `<fs-info-cell biz-model='daysService' biz-action='getMonthLists'></fs-info-cell>`,
					resolve: {
						load: ['$q', '$ocLazyLoad',( $q, $ocLazyLoad ) => {

							var deferred = $q.defer(); 

							require.ensure([], (require) => {

								var infocell = require('modules/infocell');

								var infolist = require('commoms/directives/infolist');

								ocLazyloadLib.loadModules($ocLazyLoad,[infocell,infolist])

								deferred.resolve();

							}, 'infoCellModule');

							return deferred.promise;
						}]
					}
				})
	}])
	.constant('BIZTYPE', 'general')
	.constant('APICONF', apiConf)
	.constant('DATAMAP', dataMaps);
	

try{	
	angular.bootstrap(document.body, ['fs.pay']);
}catch(e){
	basket.clear();
	alert('请刷新页面重试')
}	
