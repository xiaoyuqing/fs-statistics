export default function EventBus(){
    var eventMap = {};

    this.on = function(eventType, handler) {
        //multiple event listener
        if (!eventMap[eventType]) {
            eventMap[eventType] = [];
        }
        eventMap[eventType].push(handler);
    }

    this.once = function(eventType, handler) {//同一个handle 只执行一次
        //sigle event listener
        eventMap[eventType] = [];
        eventMap[eventType].push(handler);
    }

    this.del = function(eventType) {
        if (!eventMap[eventType]) {
            return;
        }
        for (var i = 0, elen = eventMap[eventType].length; i < elen; i++) {
            eventMap[eventType][i] =null;
        }
        delete eventMap[eventType];
    }

    this.off = function(eventType, handler) {
        for (var i = 0; i < eventMap[eventType].length; i++) {
            if (eventMap[eventType][i] === handler) {
                eventMap[eventType].splice(i, 1);
                break;
            }
        }
    }

    this.fire = function(event) {
        var eventType = event.type;
        if (eventMap && eventMap[eventType]) {
            for (var i = 0; i < eventMap[eventType].length; i++) {
                eventMap[eventType][i](event);
            }
        }
    }

}


/*事件订阅代码：

EventBus.on("someEvent", function(event) {
    // 这里处理事件
    var c = event.data.a + event.data.b;
});
事件发布代码：

EventBus.fire({
    type: "someEvent",
    data: {
        aaa: 1,
        bbb: 2
    }
});*/