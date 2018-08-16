<div class="fs-info-container clearfix">
	<div class="fs-info-left">
		<table class="fs-info-ltable info-table-mode">
			<thead>
				<tr>
					<th>日期</th>
				</tr>
			</thead>
			<tbody>
				<tr ng-repeat="(key,item) in firstItem.slice().reverse()">
					<td>{{item['x'] | date:'MM/dd'}}</td>
				</tr>
			</tbody>
		</table>
	</div>
	<div class="fs-info-right">
		<table class="fs-info-rtable info-table-mode">
			<thead>
				<tr>
					<th ng-repeat="type in dataMapItem track by $index">{{type| dataPointsFilter}}</th>
				</tr>
			</thead>
			<tbody>
				<tr ng-repeat="(index,item) in firstItem track by $index">
					<td  ng-repeat="type in dataMapItem track by $index">
						{{dataList[type].slice().reverse()[index].y}}
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>