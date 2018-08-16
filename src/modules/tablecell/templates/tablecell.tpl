<section class="table-container">
	<simplelist list = "vm.dataList"></simplelist>
    <donutchart list = "vm.dataList" ng-if="showDonut"></donutchart>   
    <p ng-if="vm.dataList.data.length === 0" class="null-data">暂无数据!</p>
</section>
