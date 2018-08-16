import '../css/selfhistogram.less';
import selfHistogramTpl from '../templates/selfhistogram.tpl';
import bindEvents from '../../_utils/bindEvents';


export default function selfHistogram($filter, $location, $state) {
  return {
    replace:true,
    restrict: 'AE',
    scope: {
      dataList: '=list',
      showFilterDate:'=showFilterDate',
      bizType:'=bizType',
      showCallTop:'=showCallTop'
    },
    template: selfHistogramTpl,
    link(scope, element) {
      var stat_date = $location.search().stat_date;
      scope.graph = {
        stat_date: stat_date,
        currentData: '', //显示当前toggle的值
        isActive: false, //显示当前toggle的class
        currentDataList: null,
        rankDataList:null,
        toFix2(val){
          return (val*100).toFixed(2)+'%'
        }
      }

      // var search = $location.search();
      // var stat_date = search.stat_date;
      // var statDate = new Date(stat_date.replace(/-/g,'/'));//Object的类型
      // var copyDate = angular.copy(statDate);
      // //7天前以及30天前的日期 yyyy-MM-dd
      // var weekStartDate = $filter('date')(new Date(statDate.setDate(statDate.getDate() - 6)),'yyyy-MM-dd');
      // var monthStartDate = $filter('date')(new Date(copyDate.setDate(copyDate.getDate() - 29)),'yyyy-MM-dd');

      //用于服务号过滤条件的
      scope.cateData = {
        data: [
          {
            heading: '所有',
            name: 'all'
          },
          {
            heading: '官方',
            name: 'official'
          },
          {
            heading: '自建',
            name: 'self'
          }
        ],
        key: 'type',
        eventType: 'fs-filter-rank'
      };

      scope.backType = {
        data: [
          {
            heading: '主调接口',
            name: 'main_call'
          },
          {
            heading: '回调接口',
            name: 'back_call'
          }         
        ],
        key: 'backType',
        eventType: 'fs-filter-interface-rank'
      };

      scope.callType = {
        data: [
          {
            heading: '主调接口',
            name: 'main_call'
          },
          {
            heading: '回调接口',
            name: 'back_call'
          }         
        ],
        key: 'backType',
        eventType: 'fs-filter-en-rank'
      };
      

    
      //由于是异步返回数据，需要watch监控数据。
      scope.$watch('dataList', function(newVal) {

          if (newVal && newVal.cellType && newVal.data  && newVal.dataMap) { //需要监控的子属性都返回的时候才执行
             
              var data = newVal.data;
              var dataMap = newVal.dataMap;

              watchScope.init(data, dataMap);
                           
          }         
      });

      var watchScope = {
          init(data, dataMap) {
            scope.graph.currentData = dataMap.dataPoints[0];
            
            this.initGarphData(data);
          },

          initGarphData(data) {
            var currentData = scope.graph.currentData;
            scope.graph.currentDataList = data[currentData];            
            scope.graph.rankDataList = scope.graph.currentDataList.slice(0,10);
            if(scope.showFilterDate){
                scope.graph.rankDataList = scope.graph.currentDataList;                
            }
            if(scope.showCallTop){
                scope.graph.rankDataList = scope.graph.currentDataList.slice(0,50);                
            }            
          },
          
          _getRouterFnName() {
              return scope.dataList.cellType.type+'rankinfo';
          },

          _getRouterParams() {
              return {
                'stat_date':scope.graph.stat_date
              };
          }
      }

      
      scope.dropdowndate = {
        onDropdownHandle(e, index) {
            e.preventDefault();
            e.stopPropagation();

            if (angular.isArray(scope.date.isActive)) {//区分是 数组的形式还是非数组的形式
                scope.date.isActive[index] = !scope.date.isActive[index];
            } else {
                scope.date.isActive = !scope.date.isActive;
            }
        },

        //点击内容区域
        onDropdownContent(e, activeData, pindex) {
            e.preventDefault();
            e.stopPropagation();

          
            if (angular.isArray(scope.date.isActive)) {
                scope.date.currentData[pindex] = activeData;
                scope.date.isActive[pindex] = !scope.date.isActive[pindex];
                this._changeToolTipContent(pindex, scope.garphDataset[pindex]);
            } else {
                scope.date.currentData = activeData;
                scope.date.isActive = !scope.date.isActive;
            }
            watchScope.initGarphData(scope.dataList.data);
        },
         //隐藏DropdownContent的区域 
        onHideDpContent(e, index) {
            //e.preventDefault();
            e.stopPropagation();
            if (angular.isArray(scope.date.isActive)) {
                scope.date.isActive[index] = false;
            }else{
                scope.date.isActive = false;
            }
        }
      }

      
    
      //bind Events
      bindEvents(scope, $filter,element, watchScope,$state);

    }
  }
}


selfHistogram.$inject = ['$filter', '$location', '$state'];