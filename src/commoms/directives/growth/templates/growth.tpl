<div class="growth-container">
    <table class="growth-table">
        <tr>
            <td class="growth-left">
                <ul class="grow-box">
                    <li class="data dataItem">{{growthData.count | currency: '':0}}</li>
                    <li class="describe">{{typeNumbers}}天总数</li>
                </ul>
            </td>
            <td class="growth-right">
                <ul class="grow-box">
                    <li class="data downrate" ng-class="{'green':growthData.rate < 0, 'red':growthData.rate > 0,'black':growthData.rate == 0}">
                        <span ng-if="growthData.rate == 0">--</span>
                        <span class="growth-arrow" ng-class="{'growth-arrow-down':growthData.rate < 0, 'growth-arrow-up':growthData.rate > 0,
                            'growth-zero':growthData.rate == 0}" ng-if="growthData.rate !='N/A'"></span>
                        <span ng-if="growthData.rate !='N/A'">{{growthData.rate < 0 ? -growthData.rate : growthData.rate | currency: ''}}%</span>
                        <span ng-if="growthData.rate =='N/A'" class="black">{{growthData.rate}}</span>
                    </li>
                    <li class="describe">{{typeNumbers}}天环比增长率</li>
                </ul>
            </td>
        </tr>

    </table>
</div>