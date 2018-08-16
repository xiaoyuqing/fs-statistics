<div class="nav-filter-container"
        ng-style="{paddingLeft:tabState.getItemW()/2+'%', paddingRight:tabState.getItemW()/2+'%'}"
    >
	<ul class="nav-filter-content clearfix" >
		<li class="item j-call-filter" 
            ng-repeat="(index, cate) in cateList.data" 
            ng-style="{width:100/(cateList.data.length)+'%'}"
            ng-class="{'active':cate.name === tabState.currTab}"
            ng-click="tabState.onTabHandle($event,index, cate)"
        >

            {{cate.heading}}      
        </li>
	</ul>
</div>