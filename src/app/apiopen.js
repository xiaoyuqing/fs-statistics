import modules from 'modules'
import serviceModules from './conf/modules/service'
import api from './conf/api/apiopen'
import mapFilter from './conf/filter/apiopen'
import dataMaps from './conf/map/apiopen'
import serviceCommoms from './conf/commoms/service'
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
angular.module('fs.apiopen', [
	'oc.lazyLoad',
	'ui.router',
	commoms,
	serviceCommoms,
	mapFilter,
	components,
	modules,
	serviceModules
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
					template: `<fs-top-nav  show-call = true></fs-top-nav>`
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
					template: `<fs-table-cell biz-model='amountsService' biz-action='getDataList' ></fs-table-cell> 
							   <fs-histogram-cell biz-model='detailAnotherService' biz-action='getAmountLists' biz-type="backType"></fs-histogram-cell>
							   <fs-histogram-cell-ath biz-model='detailService' biz-action='getAmountLists' biz-type="callType"></fs-histogram-cell-ath>
							   `,
					resolve: {
						load: ['$q', '$ocLazyLoad',( $q, $ocLazyLoad ) => {

							var deferred = $q.defer(); 

							require.ensure([], (require) => {

								var navFilter = require('commoms/directives/navfilter');																															
																																															
								ocLazyloadLib.loadModules($ocLazyLoad,[navFilter]);

								deferred.resolve();

							}, 'linechartcellModule');

							return deferred.promise;
						}]
					}		   


					
				})
				.state('modules.graphWeek', {
					url: '/week?stat_date',
					template: `<fs-line-chart-cell biz-model='daysService' biz-action='getWeekLists' show-growth=true></fs-line-chart-cell>`,
					resolve: {
						load: ['$q', '$ocLazyLoad',( $q, $ocLazyLoad ) => {

							var deferred = $q.defer(); 

							require.ensure([], (require) => {

								var navFilter = require('commoms/directives/navfilter');
								var growth = require('commoms/directives/growth');
								var linechartcell = require('modules/linechartcell');
								var linechart = require('commoms/directives/graphlist/linechart');
								
								ocLazyloadLib.loadModules($ocLazyLoad,[navFilter,growth,linechartcell,linechart]);

								deferred.resolve();

							}, 'linechartcellModule');

							return deferred.promise;
						}]
					}		   

				})
				.state('modules.graphMonth', {
					url: '/month?stat_date',
					template: `<fs-line-chart-cell biz-model='daysService' biz-action='getMonthLists' show-growth=true></fs-line-chart-cell>`,
					resolve: {
						load: ['$q', '$ocLazyLoad',( $q, $ocLazyLoad ) => {

							var deferred = $q.defer(); 

							require.ensure([], (require) => {

								var navFilter = require('commoms/directives/navfilter');
								var growth = require('commoms/directives/growth');
								var linechartcell = require('modules/linechartcell');
								var linechart = require('commoms/directives/graphlist/linechart');

								ocLazyloadLib.loadModules($ocLazyLoad,[navFilter,growth,linechartcell,linechart]);


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

								ocLazyloadLib.loadModules($ocLazyLoad,[infocell,infolist]);
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

								ocLazyloadLib.loadModules($ocLazyLoad,[infocell,infolist]);
								deferred.resolve();

							}, 'infoCellModule');

							return deferred.promise;
						}]
					}
				})				
				.state('amountrankinfo',{
					url: '/amountrankinfo?stat_date&type',
					template: `<fs-histogram-cell-ath biz-model='detailService' biz-action='getAmountLists' show-filter-date=true show-call-top = true biz-type="callType"></fs-histogram-cell-ath>`,
					resolve: {
						load: ['$q', '$ocLazyLoad',( $q, $ocLazyLoad ) => {

							var deferred = $q.defer(); 

							require.ensure([], (require) => {

								var navFilter = require('commoms/directives/navfilter');																															
																																															
								ocLazyloadLib.loadModules($ocLazyLoad,[navFilter]);

								deferred.resolve();

							}, 'rankInfoModule');

							return deferred.promise;
						}]
					}					
				})
				.state('amountathrankinfo',{
					url: '/amountathrankinfo?stat_date&type',
					template: `<fs-histogram-cell biz-model='detailAnotherService' biz-action='getAmountLists' show-filter-date=true show-call-top = true biz-type="backType"></fs-histogram-cell>`,
					resolve: {
						load: ['$q', '$ocLazyLoad',( $q, $ocLazyLoad ) => {

							var deferred = $q.defer(); 

							require.ensure([], (require) => {

								var navFilter = require('commoms/directives/navfilter');																															
																																															
								ocLazyloadLib.loadModules($ocLazyLoad,[navFilter]);

								deferred.resolve();

							}, 'rankInfoModule');

							return deferred.promise;
						}]
					}
				})
				
		}])
	.constant('BIZTYPE', 'general')
	.constant('APICONF', apiConf)
	.constant('DATAMAP', dataMaps);


try{	
	angular.bootstrap(document, ['fs.apiopen']);
}catch(e){
	basket.clear();
	alert('请刷新页面重试')
}	




