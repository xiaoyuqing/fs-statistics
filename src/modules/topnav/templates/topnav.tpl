<div>
	<div class="j-tab-container table-tab-container">
		<navfilter cate-data="cateData"  ng-if="showFilter"></navfilter>
		<div class="clearfix">
			<tabs 
				data="vm.tabData" 
				list-class="j-tab-handle-container top-nav-lists"
				ng-click="modal.onHide(modal)"
			>
			</tabs>

			<a class="table-filter-handle j-table-filter-handle top-nav-lists" 
				ng-click="filterModal($event)"
				ng-class="{'nav-is-filter': modal.show}"
			>
            	<i class="filter-icon"></i>
        	</a>
		</div>
	</div>
	
	<div class="j-statistics-contanier statistics-contanier" ng-class="{'show-cate-filter': showFilter}">
		<ui-view>				
		</ui-view>        
		<div class="modal-backdrop j-modal-backdrop fade" ng-class="{'in': modal.show}" ng-click="modal.onHide(modal)"></div>
		<div class="modal j-modal fade "  ng-class="{'in':modal.show}">
		    <div class="modal-dialog">
		        <div class="modal-content">
		        	<div class="modal-body modal-top j-modal-top" ng-if = "!showCall">
		        		<p class="title">数据筛选</p>
		        		<ul class="modal-b-list">
		        		    <li ng-repeat="(key, item) in modal.text" 
		                        ng-class="{'active': modal.active === key }"
		                        ng-click="modal.onChange(modal, key)"
		                    >
		        		    	<span class="fl">{{item}}</span>
		        		    </li>
		        		</ul>
		        	</div>
		        	<div class="modal-body modal-top j-modal-top" ng-if = "showCall">
		        		<p class="title">数据筛选</p>
		        		<ul class="modal-b-list">
		        		    <li ng-repeat="(index, cate) in callData.data" 
		                        ng-class="{'active': cate.name === tabState.currTab }"
		                        ng-click="tabState.onTabHandle(index, cate,modal)"
		                    >
		        		    	<span class="fl">{{cate.heading}}</span>
		        		    </li>
		        		</ul>
		        	</div>
		        	<div class="modal-body" ng-if="showAppFilter">
		        		<p class="title j-title">应用筛选 <span class="red">最多选择5个应用</span></p>
		        		<ul class="modal-b-list j-modal-filter-app">
		        		    <li ng-repeat = "(index,nameItem) in namelist"
								ng-click="modal.onAppFilter(modal, index)"
								ng-class="{'active_app':nameItem['checked']}"
		                    >
		        		    	<span class="fl">{{nameItem.name}}</span>
		        		    </li>
		        		   
		        		</ul>
		        	</div>
		        	<div class="modal-bottom j-modal-bottom" ng-if="showAppFilter">
		        		<p class="confirm"  ng-click="modal.onConfirm(modal)">
		        			<span>
		        				确定
		        			</span>
		        		</p>
		        	</div>
		            
		        </div>
		    </div>
		</div>		
	</div>	
</div>