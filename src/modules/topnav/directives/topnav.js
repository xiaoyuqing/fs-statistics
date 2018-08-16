import template from "../templates/topnav.tpl";
import topNavController from "../controllers/topnav";
import "../css/top-nav.less";

var changeHandle;
var initElHandle;

export default function TopNav($timeout, $window, EventBus, $rootScope) {
	return {
		template: template,
		restrict: "AE",
		replace: true,
    scope:{
           showFilter :'@showFilter',
           showAppFilter:'@showAppFilter',
           showCall:'@showCall'  
        },
		controller: topNavController,
		controllerAs: "vm",
		link: function(scope, element) {

            //用于过滤条件的
            scope.cateData = {
              data: [               
                {
                    heading: 'app端',
                    name: 'app'
                },
                {
                    heading: 'web端',
                    name: 'web'
                }
              ],
              key: 'businessName',
              eventType: 'fs-filter-category'
            };


            scope.callData = {
            data: [
              {
                  heading: '所有调用',
                  name: 'all'
              },
              {
                  heading: '内部调用',
                  name: 'internal_call'
              },
             {
                  heading: '企业调用',
                  name: 'external_call'
             }         
             ],
             key: 'callType',
             eventType: 'fs-filter-call'
            };

            
            var data = scope.callData.data;
            var key = scope.callData.key;
            var eventType = scope.callData.eventType;
            $rootScope.obserData = $rootScope.obserData || {};
            var tabState = {
              currTab: data[0]['name'],
              
              onTabHandle(index, cate,modal){
                this.currTab = cate['name'];

                var fireObj = {
                  type: eventType
                }
                fireObj['data'] = {};
                fireObj['data'][key] = cate['name'];

                EventBus.fire(fireObj);
                
                $rootScope.obserData = $rootScope.obserData || {};
                $rootScope.obserData[key] = cate['name'];

                changeHandle = $timeout(()=> {
                        modal.show = !modal.show;
                }, 50);
              }             
            }
            scope.tabState = tabState;
            if($rootScope.obserData[key]){       
             scope.tabState.currTab = $rootScope.obserData[key];
        }      


			      if (!element || element.length<=0 || element[0].nodeType !== 1) {
				       return;
			      }
            var statisEl = element[0].querySelector('.j-statistics-contanier');
            var tabEl = element[0].querySelector('.j-tab-container');
            var wh = $window['innerHeight'];//window高度

            initElHandle = $timeout(()=>{
                var th = parseInt(getComputedStyle(tabEl, null)['height']);
                statisEl.style['minHeight'] = (wh - th) + 'px';
            }, 100);

            $rootScope.showAppFilter = scope.showAppFilter;//要不要显示筛选功能
                    
            $rootScope.$watch('fs_dataList', function(newVal) {
                if (newVal && newVal.data) { //需要监控的子属性都返回的时候才执行  

                    var data = newVal.data;                    
                    watchScope.init(data); 

                    //动态计算筛选app区域的高度
                    var height_top = document.querySelector('.j-tab-container').clientHeight;
                    var height_datafilter =  document.querySelector('.j-modal-top').clientHeight;
                    var height_bottom = document.querySelector('.j-modal-bottom').clientHeight;
                    var height_title = document.querySelector('.j-title').clientHeight;
                    var height_container = document.documentElement.clientHeight;
                    var height_modal_filter_app = height_container-height_top-height_datafilter-height_bottom-height_title-60;               
                    document.querySelector('.j-modal-filter-app').style.height= height_modal_filter_app +"px";
                    document.querySelector('.j-modal-backdrop').style.backgroundColor = "white";
                    document.querySelector('.j-modal-backdrop').style.opacity = "1";
                    
                    document.querySelector('.j-modal').style.height = "100%";
                }
            });

              var watchScope = {
                init(data) { //把所有应用的名字存到一个数组里
                   scope['namelist'] = [];                            
                    for (var i = 0; i < data.length; i++ ){
                        scope['namelist'].push({
                            enName: data[i].enName,
                            name: data[i].names[0],
                            checked: false
                        });                       
                    }
                    for(var j = 0; j < 3;j++){
                        scope['namelist'][j]['checked'] = true;                                             
                    }                   
                }
              };
            
             


            //下拉 modal 组件的scope
            scope.modal = {
                text: {
                    'fsInclude': '包含纷享数据',
                    'fsExclude': '排除纷享数据'
                },
                name:scope['namelist'],
                active: 'fsInclude',
                appCheckedList:[],
                onChange: function(content, key){
                    content.active = key;
                    changeHandle = $timeout(()=> {
                        content.show = !content.show;
                    }, 50);
                    
                    EventBus.fire({
                        type: 'fs-filter-exclude',
                        data: {
                            fsExclude: scope.modal.active === 'fsExclude'
                        }
                    });

                    $rootScope.obserData = $rootScope.obserData || {};
                    $rootScope.obserData['fsExclude'] = scope.modal.active === 'fsExclude';                   
                },

                onAppFilter: function(modal , index){//最多选五个应用
                    Array.prototype.indexOf = function(val) {              
                      for (var i = 0; i < this.length; i++) {  
                        if (this[i] == val) return i;  
                       }  
                       return -1;  
                    };  
                    Array.prototype.remove = function(val) { //把某个值从数组里面删除掉
                      var index = this.indexOf(val);
                        if (index > -1) {
                          this.splice(index, 1);
                        }
                    };
                   
                   if($rootScope.appenName.length < 5){                    
                     if(scope['namelist'][index]['checked'] == true){                        
                        $rootScope.appenName.remove(scope['namelist'][index]['enName']);                        
                     } 
                     else {
                       $rootScope.appenName.push(scope['namelist'][index]['enName']);
                     } 
                     scope['namelist'][index]['checked'] = !scope['namelist'][index]['checked'];
                     return;
                    }

                    if($rootScope.appenName.length == 5){
                        if(scope['namelist'][index]['checked'] == true){
                        scope['namelist'][index]['checked'] = !scope['namelist'][index]['checked'];
                        $rootScope.appenName.remove(scope['namelist'][index]['enName']);
                      } 
                    }
                    
                    document.addEventListener('touchmove', function(evt){
                        if (evt.target!==document.querySelector('.modal-filter-app')) {
                            evt.preventDefault();
                        }
                    },false);                                        
                },

                onConfirm: function(modal){
                    EventBus.fire({
                        type: 'fs-filter-app'
                    });
                   
                   changeHandle = $timeout(()=> {
                        modal.show = !modal.show;
                    }, 50);
                   
                   // console.log($rootScope.appenName)
                    document.addEventListener('touchmove', function(evt){
                        if (evt.target!==document.querySelector('.modal-filter-app')) {
                            window.event.returnValue = true;
                        }
                    },false);
                },

                onHide: function (modal) {

                    if (modal.show) {
                        modal.show = !modal.show;
                    }                   
                },

                show: false
            }
            $rootScope.obserData = $rootScope.obserData || {};
            if($rootScope.obserData['fsExclude']){
              scope.modal.active = 'fsExclude';
            }

                   
			scope.filterModal = function () {   
                if($rootScope.showAppFilter){                   
                    for(var k = 0; k < $rootScope.appenName.length;k++){ //记住应用的选中状态
                        for(var i = 0;i < scope['namelist'].length; i++){
                            if($rootScope.appenName[k] == scope['namelist'][i]['enName']){
                               scope['namelist'][i]['checked'] = true;  
                            }
                        } 
                    }  
                }                                         
                scope.modal.show = !scope.modal.show;
			}

			scope.$on("$destroy",function() {
                    $timeout.cancel( changeHandle );
                    $timeout.cancel( initElHandle );
                }
            );
		}
	}
}

TopNav.$inject = ['$timeout', '$window', 'EventBus', '$rootScope'];