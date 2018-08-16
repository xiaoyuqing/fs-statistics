/**
 * [convertData description]
 * 类似banner类型的数据
 * @param  {[type]} metadata [description] 源数据，可以是数组形式或者非数组形式
 * @param  {[type]} tableMap [description] k,v的对象用于中英文互转
 * @return {[type]}          [description]
 */
export default function convertData(metadata) {
    var tmpObj = {};
    tmpObj = angular.copy(metadata, tmpObj);
    var metaData = tmpObj.data;
    for (var i = 0; i < metaData.length; i++) {
        var dataPoints = metaData[i].dataPoints;
        var dataCate = {};
        angular.forEach(dataPoints, function(items){
            for(var prop in items){
                if (prop!=='stat_date') {
                    dataCate[prop] = dataCate[prop] || [];
                    dataCate[prop].push({
                        y: items[prop],
                        x: items['stat_date']
                    });
                }
            }
        });
        metaData[i].dataPoints = dataCate;
    }
    return tmpObj;
}
