import '../css/loadingmore.less';
import loadingmoreTpl from '../templates/loadingmore.tpl';

export default function loadingmore($location) {
  return {
    replace:true,
    restrict: 'AE',
    scope: {
      dataList: '=list'
    },
    template: loadingmoreTpl,
    link(scope) {
      
    }
  }
}


loadingmore.$inject = ['$location'];