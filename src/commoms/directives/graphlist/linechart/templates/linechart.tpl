<div>
<div  ng-repeat="(type,dataItem) in dataList.data track by $index">
    <table 
        class="fs-table graph-container j-graph-container" 
        ng-click="bindEvents.onHideDpContent($event, $index)" data-type={{dataItem['enName']}} 
        >
            <thead class="graph-dropdown">
                <tr>
                    <th>
                        <span class="fs-graph-name">
                            <span ng-repeat="(prop, name) in dataItem['names']  track by $index">
                                <span ng-if="$index ==0 ">{{name}}</span>
                                <span ng-if="$index !==0 ">({{name}})</span>
                            </span>
                        </span>
                    </th>

                    <th class="dropdown-warp">

                        <div 
                            class="dropdown-handle" 
                            ng-click="bindEvents.onDropdownHandle($event, $index)"
                            ng-class="{'active':graph.isActive[type]}"
                        >
                            {{graph.currentData[$index] | dataPointsFilter}}
                        </div>

                        <ul class="dropdown-content" ng-show="graph.isActive[type]">

                            <li ng-repeat="cate in getDataMapItem(dataList, type) track by $index">

                                <p ng-click="bindEvents.onDropdownContent($event, cate, type)">
                                    {{cate | dataPointsFilter}}
                                </p>
                            </li>
                        </ul>

                    </th>
                </tr>
            </thead>

            <tbody>
                
                <tr>
                    <td colspan="2">
                        <growth 
                            ng-if="showGrowth"
                            growth-data="dataItem.attrs.growth[graph.currentData[$index]]"
                            type-numbers="dataList.cellType.numbers"
                            >
                        </growth>
                    </td>
                </tr>
                <tr>
                    <td colspan="2">
                        <div class="graph-content">
                        <nvd3 
                            options="garphOptions[$index]"
                            data="garphDataset[$index]"
                            class="j_nvd3_box_{{$index}}"
                        >
                        </nvd3>
                        </div>
                    </td>
                </tr>

                <tr>
                    <td></td>
                    <td>
                        <a class="graph-view-detail" 
                            ui-sref="{{dataList.cellType.type+'info'}}({ 'stat_date':'{{graph.stat_date}}', 'type':'{{type}}' })"
                        >查看详情&nbsp;></a>
                    </td>
            </tr>
                
        </tbody>
    </table>
</div>


</div>
