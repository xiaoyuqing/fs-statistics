//import 'libs/nv.d3.css';
import bindEvents from '../../_utils/bindEvents';
import graphTpl from '../templates/donutchart.tpl';
import '../css/donutchart.less';

var dpr2px = lib.flexible.dpr2px;
export default function donutchart($filter) {
    return {
        replace: true,
        restrict: 'AE',
        scope: {
            dataList: '=list'
        },
        template: graphTpl,
        link(scope) {

            scope.options = {
                chart: {
                    type: 'pieChart',
                    height: dpr2px(335),
                    donut: true,
                    margin: {
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: dpr2px(30)
                    },
                    x: function(d){return d.key+"个"+d.rate+"%";},
                    y: function(d){return d.value;},
                    showLabels: false,
                    donutRatio: lib.flexible.dpr <3 ? 1.2 : 0.5,
                    pie: {
                        startAngle: function(d) { return d.startAngle -Math.PI },
                        endAngle: function(d) { return d.endAngle -Math.PI }
                    },
                    duration: 500,
                    transitionDuration: 500,
                    legendPosition: 'right',
                    // showLegend: false,
                    legend: {
                        margin: {
                            top: dpr2px(12),
                            right: 0
                        },
                        padding: dpr2px(30),
                        align:false
                    }
                }
            };

            
            //由于是异步返回数据，需要watch监控数据。
            scope.$watch('dataList', function(newVal) {
                if (newVal && newVal.data) { //需要监控的子属性都返回的时候才执行
                    var data = newVal.data;          
                    watchScope.init(data);   
                }
            });

            var watchScope = {
                init(data) {
                    scope['graphDataset']= [];

                    if (!data[0] || !data[0].attrs) {
                        return;
                    }
                    
                    var attrs = data[0].attrs;
                    var dountAttr = Object.keys(attrs);

                    for (var i = 0, len = dountAttr.length; i< len; i++) {
                        if (!data[0].attrs[dountAttr[i]] || data[0].attrs[dountAttr[i]].length<=0) {
                            return;
                        }
                        var attrItemData = data[0].attrs[dountAttr[i]].data;
                        for(var j = 0 ; j< attrItemData.length; j++){
                            scope['graphDataset'][i] = scope['graphDataset'][i] || [];
                            scope['graphDataset'][i].push(attrItemData[j])
                        }
                    }
              }
              
            };

          bindEvents(scope, $filter, watchScope);
              
        }
    }
}

donutchart.$inject = ['$filter'];