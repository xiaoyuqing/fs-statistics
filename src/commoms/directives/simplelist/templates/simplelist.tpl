<div>
  
    <table class="fs-table simple-table" ng-repeat="dataItem in dataList.data track by $index">
        <thead>
            <tr>
                <th>
                    <span ng-repeat="(prop, name) in dataItem['names']  track by $index" class="fs-name">
                        <span ng-if="$index ==0 " >{{name}}</span>
                        <span ng-if="$index !==0 ">({{name}})</span>
                    </span>
                </th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr ng-repeat="(attrProp, subAttrVal) in dataItem['displayAttrs']" 
              class="tr-attrs"
            >
                <td>{{attrProp | displayAttrsFilter}}</td>
                <td>{{subAttrVal}}</td>
            </tr>
        
           <tr 
               ng-repeat="prop in getDataMapItem(dataList,$index) track by $index"
               
           >
               <td>
                   {{prop | dataPointsFilter}}
               </td>
               <td>
                   {{dataItem['dataPoints'][prop][0]['y']}}
               </td>
           </tr>
        </tbody>
        
    </table>
 
</div>