<div  class="donut"> 
    <table  ng-repeat="(name, dataItem) in dataList.data[0].attrs track by $index" class="fs-table donutchartgraph" ng-if="graphDataset[$index].length>0">
        <thead>
            <tr>
                <th>
                        <span class="fs-name">{{dataItem['name']}}</span>                       
                </th>
            </tr>
            <tr>
                <th class="desc">
                        <span >{{dataItem['desc']}}</span><span class="exclude">&nbsp;&nbsp;(不包含未创建服务号的企业)</span>                       
                </th>               
            </tr>
        </thead>
        <tbody class="fs-table-donutchart">
            <tr>
              <td>
                 <div class="donutchart">
                   <div>
                    <nvd3 
                        options="options"
                        data="graphDataset[$index]"
                     >
                    </nvd3>
                    </div>
                  </div>
              </td>         
            </tr>
        </tbody>        
    </table>
</div>