export default function bindEventsFn(scope, $filter, element, watchScope, $state){

    var El = element[0]; 

  //bind Events
    scope.bindEvents = {
        //点击箭头下拉
        onDropdownHandle(e, index) {
            e.preventDefault();
            e.stopPropagation();

            if (angular.isArray(scope.graph.isActive)) {//区分是 数组的形式还是非数组的形式
                scope.graph.isActive[index] = !scope.graph.isActive[index];
            } else {
                scope.graph.isActive = !scope.graph.isActive;
            }
        },

        //点击内容区域
        onDropdownContent(e, activeData, pindex) {
            e.preventDefault();
            e.stopPropagation();

          
            if (angular.isArray(scope.graph.isActive)) {
                scope.graph.currentData[pindex] = activeData;
                scope.graph.isActive[pindex] = !scope.graph.isActive[pindex];
                this._changeToolTipContent(pindex, scope.garphDataset[pindex]);
            } else {
                scope.graph.currentData = activeData;
                scope.graph.isActive = !scope.graph.isActive;
            }
            watchScope.initGarphData(scope.dataList.data);
        },


        //设置默认 tooltip 显示值。
        _changeToolTipContent(pindex, activeList) {
          
            var $container = El.querySelectorAll('.j-graph-container');
            activeList = activeList[0].values;

            angular.forEach($container, function(item, index) {
                if (index === pindex) {
                    var $nvTip = $container[index].querySelector('.j_nv_tooltip');

                    var $tmpTip = $container[index].querySelector('.j_nvd3_box_' + index);
                    var $tips = $nvTip || $tmpTip;
                    var key = scope.graph.currentData[pindex];
                    var $td = $tips.querySelectorAll('td');

                    var showList = activeList[activeList.length - 1];

                    var x = d3.time.format('%Y-%m-%d')(new Date(showList.x));
                    $td[0].innerHTML = $filter('dataPointsFilter')(key) + "：" + (showList.y ? showList.y : 0);
                    $td[1].innerHTML = x;

                    return;
                }
            })
        },

        //隐藏DropdownContent的区域 
        onHideDpContent(e, index) {
            //e.preventDefault();
            e.stopPropagation();
            if (angular.isArray(scope.graph.isActive)) {
                scope.graph.isActive[index] = false;
            }else{
                scope.graph.isActive = false;
            }
        },

        onRouter(){
            $state && $state.go(watchScope._getRouterFnName(),watchScope._getRouterParams());
        }
    }
}