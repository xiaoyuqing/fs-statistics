<section class="table-container">
	<linechart list = "vm.dataList" show-growth = "showGrowth"></linechart>
    <p ng-if="vm.dataList.data.length === 0" class="null-data">暂无数据!</p>
</section>
