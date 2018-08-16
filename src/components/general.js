/*service*/
import eventbus from "./services/eventbus";
import toast from "./services/toast";
import uitab from './uitab/index';

export default angular.module(
    "fs.components", 
        [
            eventbus, toast,
            uitab
        ]
    ).name;