import template from "../templates/toast.tpl";

import "../css/toast.less";

import ComponentZIndex from "../../../zindex";

var cancelhandle = 0;

export default class ToastService {

    constructor($document, $q, $rootScope, $compile, $timeout) {
        this.$document = $document;
        this.$q = $q;
        this.$rootScope = $rootScope;
        this.$compile = $compile;
        this.$timeout = $timeout;
        this.dialogArr = [];

        this.dialogCounter = 0;
        this.zIndex = ComponentZIndex.Toast;

    }
    alert(param, autoClose) {
        cancelhandle &&  this.$timeout.cancel( cancelhandle );
        
        param.type = param.type|| 'primary';

        let dialog;
        this.dialogCounter++;

        let data = angular.extend(this.$rootScope.$new(), param);

        dialog = this.$compile(angular.element(template))(data);

        this.$document.find("body").append(dialog);
        dialog.css("display", "block");
        dialog.css("z-index", this.zIndex + this.dialogCounter);

        this.dialogArr.push(dialog);

        if (autoClose) {
            cancelhandle = this.$timeout(() => {
              this.dismiss(dialog);
            },7000);
        }

        return dialog;
    }

    dismiss(dialog) {

        this.dialogCounter--;
        dialog.remove();

        for (let i = 0; i < this.dialogArr.length; i++) {
            if (this.dialogArr[i] == dialog) {
                this.dialogArr.splice(i, 1);
                break;
            }
        }

    }

    dismissAll() {
        while (this.dialogArr.length > 0) {
            this.dismiss(this.dialogArr[0]);
        }
    }
}

ToastService.$inject = ["$document", "$q", "$rootScope", "$compile", "$timeout"];