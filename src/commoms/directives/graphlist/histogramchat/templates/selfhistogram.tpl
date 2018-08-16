<div>
	<div>
		<div  class="self-histogramchat">
			<span class="fs-graph-name" ng-if="!bizType">
				<span>服务号排行榜</span>
			</span>
			<span class="fs-graph-name"  ng-if="bizType=='backType'">
				<span>接口调用排行</span>
			</span>
			<span class="fs-graph-name" ng-if="bizType=='callType'">
				<span>调用企业排行</span>
			</span>
			<navfilter cate-data="cateData" ng-if="!bizType"></navfilter>
			<div ng-if="bizType=='backType'">
				<navfilter cate-data="backType"></navfilter>	
			</div>

			<div ng-if="bizType=='callType'">
				<navfilter cate-data="callType"></navfilter>	
			</div>
			
			<table class="servicetable graph-container" 
				ng-click="bindEvents.onHideDpContent($event)"
			>

				<thead class="graph-dropdown">
				    <tr>
				        <th>
				        	<!-- <div 
		                        class="dropdown-handle" 
		                        ng-click="dropdowndate.onDropdownHandle($event)"
		                        ng-class="{'active':date.isActive}"
		                    >
		                        {{dateState.currTab}}
		                    </div>

		                    <ul class="dropdown-date-content" ng-show="date.isActive">

		                       <li ng-repeat="(index ,date) in dateData.data track by $index">

		                          <p ng-click="dateState.onTabHandle(index,date)">
		                             {{date.heading}}  
		                          </p>
		                       </li>
		                    </ul> -->
				        </th>

				        <th class="dropdown-warp">

				            <div 
				                class="dropdown-handle" 
				                ng-click="bindEvents.onDropdownHandle($event)"
				                ng-class="{'active':graph.isActive}"
				            >
				                {{graph.currentData | dataPointsFilter}}
				            </div>

				            <ul class="dropdown-content" ng-show="graph.isActive">

				                <li ng-repeat="cate in dataList.dataMap['dataPoints'] track by $index">

				                    <p ng-click="bindEvents.onDropdownContent($event, cate)">
				                       {{cate | dataPointsFilter}}  
				                    </p>
				                </li>
				            </ul>

				        </th>
				    </tr>
				</thead>


				<tbody>

					<tr ng-repeat="itemData in graph.rankDataList">
						<td class="td_left" valign="top">
							<span class='rank-num barchart-color' ng-class="'barchart-color-'+$index">
								{{$index+1}}
							</span>
							<p class="rank-name">{{itemData.name}}</p>
						</td>
						<td class="td_right">
							<p class="bar">
								<b class="bar_b barchart-color" 
									ng-class="'barchart-color-'+$index"
									ng-style="{'width': graph.toFix2(itemData.count/graph.currentDataList[0]['count'])}"
								></b>
							</p>
							<p class="datadetail">
								{{itemData.count}}
							</p>
						</td>
					</tr>
					<tr>
			            <td></td>
			             <td class="graph-detail">
			               <a class="graph-view-detail" 
			               		ng-click="bindEvents.onRouter()"
			               		 ng-if="!showFilterDate"
			                    >查看详情&nbsp;></a>
			             </td>
			        </tr>
				</tbody>
			</table>
		</div>
	</div>	
</div>