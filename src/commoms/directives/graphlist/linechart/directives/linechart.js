//import 'libs/nv.d3.css';
import bindEvents from '../../_utils/bindEvents';
import initState from '../../_utils/initState';

import graphTpl from '../templates/linechart.tpl';

import '../css/linechart.less';

var dpr2px = lib.flexible.dpr2px;

export default function linechart($filter, $location) {
    return {
        replace: true,
        restrict: 'AE',
        scope: {
            dataList: '=list',
            showGrowth: '=showGrowth'
        },
        template: graphTpl,
        link(scope, element) {
            var stat_date = $location.search().stat_date;

            scope.graph = {
                stat_date: stat_date,
                currentData: {}, //显示当前toggle的值
                isActive: [] //显示当前toggle的class
            }

            scope.getDataMapItem = function(dataList, type){
              return dataList.boolString(dataList.dataMap['dataPoints'][0]) ? dataList.dataMap['dataPoints'] : dataList.dataMap['dataPoints'][type];
            }

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
                    initState(scope, data, dataMap);

                    this.initGarphData(data);

                },

                //初始化图表的数据
                initGarphData(data) {
                    var _this = this;
                    scope['garphDataset'] = [];
                    scope['garphOptions'] = [];
                    
                    for (var i = 0, len = data.length; i < len; i++) {

                        _this._garphDatas(i, data[i].dataPoints);
                        _this._garphOptions(i, data[i].dataPoints);
                    }
                },


                _garphDatas(index, dataPoints) {
                    var itemList = dataPoints;
                    var currentKey = scope.graph.currentData[index];
                    scope['garphDataset'].push(itemList[currentKey] && [{
                        values: itemList[currentKey],
                        key: currentKey,
                        color: 'rgb(215, 170, 255)',
                        area: true
                    }]);

                },


                //计算显示数值
                _getYAxisVal(value) {//暂时最多支持到百万的级别
                    if (value > 1000) {
                      if (value >= 1000000) {
                        return ~~(value / 10000) + 'W';
                      }

                      return (value / 10000).toFixed(2) + 'W';
                    } else {
                        return value;
                    }
                },

                //得到Y轴的纵坐标的值
                _getYDomainVal(itemList) {
                    var minVal = d3.min(itemList, function(d) {
                        return ~~(d.y * 0.8);
                    });
                    var maxVal = d3.max(itemList, function(d) {
                        return ~~(d.y * 1.1);
                    });

                    return [minVal, maxVal];

                },

                _garphOptions(index, itemVal) {
                    var _this = this;
                    var _height = dpr2px(300);
                    var pointsArr = [dpr2px(50), dpr2px(80)];

                    var currPoint = scope.graph.currentData[index];
                    var currItemList = itemVal[currPoint];

                    scope['garphOptions'].push({
                        chart: {
                            type: 'lineChart',
                            height: _height,
                            margin: {
                                //top: dpr2px(20),
                                bottom: dpr2px(25),
                                right: dpr2px(25),
                                left: dpr2px(35)
                                //35
                            },
                            pointRange: pointsArr,
                            x: function(d) {
                                return d.x;
                            },
                            y: function(d) {
                                return d.y;
                            },
                            useInteractiveGuideline: true,
                            interactiveLayer: {
                                tooltip: { //自定义tooltip的内容
                                    contentGenerator: function(e) {
                                        return _this.__getTipsContent(e);
                                    }
                                },

                                dispatch: {
                                    /*elementMousemove: function(){
                                      var $hoverTips = angular.element(element[0].querySelector('.j_nvhover_tips_' + prop));
                                      if ($hoverTips.length <= 0) {
                                        return;
                                      }
                                      $hoverTips.addClass('hide');
                                    }*/
                                }
                            },
                            clipEdge: false, //边缘不被clip掉
                            showLegend: false, //不显示legend
                            xAxis: {
                                tickFormat: function(d) {
                                    return d3.time.format('%m/%d')(new Date(d))
                                },
                                ticks:6,
                                showMaxMin: true//不显示最大的值
                            },
                            yAxis: {
                                tickFormat: function(d) {
                                    return _this._getYAxisVal(d)
                                        //d3.format('.f')(d);
                                },
                                ticks: 7,
                                showMaxMin: false
                            },
                            yDomain: _this._getYDomainVal(currItemList),
                            callback: function() {

                                var graphBox = angular.element(element[0].querySelector('.j_nvd3_box_' + index));

                                var item = currItemList[currItemList.length - 1];

                                var html = `
                                <div class="nvtooltip ${'j_nvhover_tips_'+index}">
                                  <table class="custom-tp-table">
                                    <tbody> 
                                      <tr>
                                        <td>${ $filter('dataPointsFilter')(currPoint)} ：${(item.y ? item.y : 0) } </td>
                                        <td class='time'> ${d3.time.format('%Y-%m-%d')(new Date(item.x))} </td> 
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>`;

                                graphBox.append(html);
                            }
                        }
                    });
                },
                //图表Dispatch事件得到SVG的parent的元素
                __getTipsContent(e) {
                    //var _this = this;
                    var series = e.series;
                    var tpl = [];
                    for (var i = 0, len = series.length; i < len; i++) {
                        tpl.push(`
                          <table class='custom-tp-table'>
                            <tbody> 
                              <tr>
                                <td>${$filter('dataPointsFilter')(series[i].key)}：${(series[i].value ? series[i].value : 0)} </td>
                                <td class='time'> ${d3.time.format('%Y-%m-%d')(new Date(e.value))} </td> 
                              </tr>
                            </tbody>
                          </table>
                        `);
                    }
                    return tpl;
                }
            };

            
            //bind Events
            bindEvents(scope, $filter,element, watchScope);
        }
    }
}

linechart.$inject = ['$filter', '$location'];