import '../css/growth.less';
import growthTpl from '../templates/growth.tpl';

export default function growth() {
  return {
        replace:true,
        restrict: 'AE',
        scope: {
          growthData: '=growthData',
          typeNumbers: '=typeNumbers'
        },
        template: growthTpl
    }
}

