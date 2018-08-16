<ul class="{{'tab-container '+listClass}}">
    <li class="{{itemClass+' tab'}}"
        ng-style="{width:100/tabs.length+'%'}"
        ng-repeat="tab in tabs"
        ng-class="{active: tab.active, disable: tab.disable}"
        ng-click="go(tab)">
            <a>
                {{tab.heading}}     
            </a>
    </li>
</ul>