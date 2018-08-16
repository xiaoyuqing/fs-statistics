export default function initState(scope, data, dataMap) {
    var dataMapPoints = dataMap.dataPoints;

    //是否是简单的一维数组模式
    //如果是一维数组则 各个数据list的key是相同的
    //如果是二维数组则 各个数据list的key是不相同(二维数组的数据项必须和list的数据项一致),需要单独处理
    var isSimpleType = angular.isString(dataMapPoints[0]);
    

    for (var i = 0, len = data.length; i < len; i++) {

        scope.graph.currentData[i] = isSimpleType ? dataMapPoints[0] : dataMapPoints[i][0];

        scope.graph.isActive[i] = false;
    }
}