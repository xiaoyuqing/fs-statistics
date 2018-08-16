/**
 * 轻量级实用工具函数库
 * @version 1.0
 * @author luoying
 * @since 2016/1/9
 * @copyright fxiaoke <https://www.fxiaoke.com>
 */
(function() {
    'use strict';

    var primitiveTypes = ['undefined', 'string', 'number', 'boolean'];
    var toString = Object.prototype.toString;
    var hasOwn = Object.prototype.hasOwnProperty;
    var slice = Array.prototype.slice;
    var push = Array.prototype.push;
    var _uuid = 0;

    var _ = {
        /**
         * 对象继承
         * @function extend
         * @param  {Object} [dest]  
         * @param  {...Object} [props] 
         * @return {Object}       
         */
        extend: function(dest, props) {
            if (arguments.length === 0) {
                return this;
            }

            if (arguments.length === 1) {
                props = slice.call(arguments, 0);
                dest = this;
            } else {
                props = slice.call(arguments, 1);
            }

            for (var i = 0, l = props.length; i < l; i++) {
                var prop = props[i];
                for (var key in prop) {
                    dest[key] = prop[key];
                }
            }
            return dest;
        }
    };

    _.extend({
        /**
         * 生成唯一ID
         * @param  {string} [prefix] ID前缀
         * @return {string}        
         */
        uniqueId: function(prefix) {
            return (prefix ? prefix + '_' : '') + (++_uuid);
        },

        /**
         * 检测数组
         * @function isArray
         * @param  {Array} arr 
         * @return {Boolean}
         */
        isArray: Array.isArray || function(arr) {
            return toString.call(arr) === '[object Array]';
        },

        /**
         * 检测伪数组(数组也会返回true)
         * @param  {String|arguments|Array|NodeList}  obj 
         * @return {Boolean}     
         */
        isArrayLike: function(obj) {
            if (_.isNull(obj) || _.isDocument(obj) || obj === window) {
                return false;
            }

            var length = obj.length;
            if (_.isElement(obj) && length) {
                return true;
            }

            return _.isString(obj) || _.isArray(obj) || length === 0 || (typeof length === 'number' && length > 0 && (length - 1) in obj);
        },

        /**
         * 检测布尔值
         * @param  {boolean} bool 
         * @return {Boolean}
         */
        isBoolean: function(bool) {
            return bool === true || bool === false || toString.call(bool) == '[object Boolean]';
        },

        /**
         * 检测日期类型
         * @param  {Date} date 
         * @return {Boolean}
         */
        isDate: function(date) {
            return toString.call(date) === '[object Date]';
        },

        /**
         * 检测非undefined值
         * @param  {*}  value 
         * @return {Boolean}       
         */
        isDefined: function(value) {
            return value !== void 0;
        },

        /**
         * 检测document
         * @param  {Document}  doc 
         * @return {Boolean}     
         */
        isDocument: function(doc) {
            return doc && doc.nodeType === 9 || false;
        },

        /**
         * 检测DOM元素
         * @param  {HTMLElement}  ele 
         * @return {Boolean}     
         */
        isElement: function(ele) {
            return ele && ele.nodeType === 1 || false;
        },

        /**
         * 检测空值
         * 能够返回空值的情况：null、undefined、数值、布尔值、""、[]、{}和function(){}
         * @param  {*}  value 任意值
         * @return {Boolean}       
         */
        isEmpty: function(value) {
            if (!value) {
                return true;
            }

            if (_.isFunction(value)) {
                var str = _.trimAll(value.toString());
                return str.substr(str.indexOf('{') + 1, 1) === '}';
            }

            if (_.isArray(value) || _.isArrayLike(value)) {
                return !value.length;
            }

            if (_.isPlainObject(value)) {
                return !_.keys(value).length;
            }

            return true;
        },

        /**
         * 比较两个对象是否内容相同(Note:内容相同与引用相等不一样)
         * @param  {*}  value 
         * @param  {*}  other 
         * @return {Boolean}    
         * @example
         * var a = {a:1, b:2};
         * _.isEqual(a, {a: 1, b:2});
         * // => true   
         */
        isEqual: function(value, other) {
            if (value === other) {
                return true;
            }

            if (_.isNull(value) || _.isNull(other)) {
                return value === other;
            }

            var ta = typeof value;
            var tb = typeof other;

            if (ta !== tb) {
                return false;
            }

            var aisa = _.isArray(value);
            var bisa = _.isArray(other);

            if (aisa !== bisa) {
                return false;
            }

            return (aisa ? isArrEqual(value, other) : isObjEqual(value, other));
        },

        /**
         * 检测函数
         * @param  {Function} fn 
         * @return {Boolean}     
         */
        isFunction: function(fn) {
            return toString.call(fn) === '[object Function]';
        },

        /**
         * 检测null值(undefined不等于null)
         * @param  {*}  value 
         * @return {Boolean}       
         */
        isNull: function(value) {
            return value === null;
        },

        /**
         * 检测数值
         * @param  {Number}  n 
         * @return {Boolean}   
         */
        isNumber: function(n) {
            return typeof n === 'number' || toString.call(n) === '[object Number]';
        },

        /**
         * 检测对象，除null、undefined、数值、字符串、布尔值以外的所有对象
         * @param  {Object}  obj 
         * @return {Boolean}     
         */
        isObject: function(obj) {
            var type = typeof obj;
            return obj && (type === 'object' || type === 'function') || false;
        },

        /**
         * 检测对象是否是字面量对象(即使用{}或new Object()创建的对象)
         * @param  {Object}  obj 
         * @return {Boolean}     
         */
        isPlainObject: function(obj) {
            if (!_.isObject(obj) || obj.nodeType || obj === obj.window) {
                return false;
            }

            try {
                if (obj.constructor && !hasOwn.call(obj, 'constructor') && !hasOwn.call(obj.constructor.prototype, 'isPrototypeOf')) {
                    return false;
                }
            } catch (e) {
                return false;
            }

            for (var key in obj) {}
            return _.isUndefined(key) || hasOwn.call(obj, key);
        },

        /**
         * 检测字符串
         * @param  {String}  s 
         * @return {Boolean}   
         */
        isString: function(s) {
            return typeof s === 'string' || toString.call(s) === '[object String]';
        },

        /**
         * 检测undefined值(null不等于undefined)
         * @param  {*}  value 
         * @return {Boolean}       
         */
        isUndefined: function(value) {
            return value === void 0;
        },

        /**
         * 将数组转换成字面量对象，字面量对象的键名由参数keys来指定。
         * @param {Array} arr
         * @param {Array} [keys] 键名列表，若不指定键名，则以数组索引代替
         * @return {Object}
         * @example
         * _.fromArray([1, 2, 3], ['a', 'b', 'c']);
         * // => {a: 1, b: 2, c: 3}
         */
        fromArray: function(arr, keys) {
            var rs = {};
            if (_.isArray(arr) || _.isArrayLike(arr)) {
                if (keys && !_.isArray(keys)) {
                    keys = [keys];
                }

                _.each(arr, function(a, i) {
                    var key = keys && keys[i] || i;
                    rs[key] = a;
                });
            }
            return rs;
        },

        /**
         * 将伪数组转成数组。
         * @param {ArrayLike} arrayLike
         * @return {Array}
         * @example
         * function fn(){
         *   return _.toArray(arguments);
         * }
         * fn(1, 2, 3);
         * // => [1, 2, 3]
         */
        toArray: function(arrayLike) {
            return _.isArrayLike(arrayLike) ? slice.call(arrayLike) : [];
        },

        /**
         * 按千分位格式化数值。支持小数格式化。
         * @param {Number} number
         * @return {String}
         * @example
         * _.thousands(123456);
         * // => "123,456"
         */
        thousands: function(n) {
            n = +n;

            if (!_.isNumber(n) || isNaN(n)) {
                return '';
            }

            var s = n.toString();
            if (s.length <= 3) return s;

            s = s.split('.');

            var res = [];
            var integer = s[0];
            var decimal = s[1];
            var l = integer.length;

            for (var i = 0; i < l; i++) {
                i && i % 3 === 0 && res.unshift(',');
                res.unshift(integer[l - i - 1]);
            }

            res = res.join('');
            return decimal ? (res + '.' + decimal) : res;
        },

        /**
         * 补0格式化数值，当数值位数小于指定值时，在数值之前以0补位。默认2位数。
         * @param {Number} number
         * @param {Number} [len=2] 位数
         * @return {String}
         * @example
         * _.zeroize(5, 3);
         * // => "005"
         */
        zeroize: function(n, len) {
            if (!_.isNumber(n)) {
                return '';
            }

            _.isDefined(len) || (len = 2);
            return n < Math.pow(10, len - 1) ? _.repeat('0', len - n.toString().length) + n : n.toString();
        },

        /**
         * 驼峰式字符串
         * @param {String} s 
         * @return {String} 
         * @example
         * _.camelCase("background-color");
         * _.camelCase("background_color");
         * // => backgroundColor
         */
        camelCase: function(s) {
            return (s || '').replace(/[-|_](\w)/g, function(m, p1) {
                return p1.toUpperCase();
            });
        },

        /**
         * 首字母大写
         * @param  {String} s 
         * @return {String}   
         * @example
         * _.capitalize('abcd');
         * // => Abcd
         */
        capitalize: function(s) {
            if (_.isEmpty(s)) {
                return s;
            }
            return s.charAt(0).toUpperCase() + s.slice(1);
        },

        /**
         * 将&<>"'`字符转义成HTML entities
         * @param  {String} s
         * @return {String}
         * @example
         * _.escape('<a>hello world.</a>');
         * // => "&lt;a&gt;hello world.&lt;/a&gt;"
         */
        escape: function(s) {
            return (s || '').replace(/[&<>"'`]/g, function(chr) {
                return {
                    '&': '&amp;',
                    '<': '&lt;',
                    '>': '&gt;',
                    '"': '&quot;',
                    '\'': '&#39;',
                    '`': '&#96;'
                }[chr];
            });
        },

        /**
         * 串号式字符串
         * @param  {String} s
         * @return {String}
         * @example
         * _.kebabCase("backgroundColor");
         * _.kebabCase("background_color");
         * // => background-color
         */
        kebabCase: function(s) {
            if (_.isEmpty(s)) {
                return s;
            }

            s = s.charAt(0).toLowerCase() + s.slice(1);
            return s.replace(/[A-Z|_]/g, function(m) {
                return '-' + m.replace(/_/g, '').toLowerCase();
            });
        },

        /**
         * 将给定字符串重复count次
         * @param {String} str
         * @param {Number} count
         * @return {String}
         * @example
         * _.repeat('abc', 3);
         * // => "abcabcabc"
         */
        repeat: function(str, count) {
            count = Math.floor(+count);
            if (isNaN(count) || count < 0 || !isFinite(count)) {
                return '';
            }

            var s = '';
            while (count--) {
                s += str;
            }
            return s;
        },

        /**
         * snake式字符串
         * @param  {String} s
         * @return {String}
         * @example
         * _.snakeCase("fooBar");
         * _.snakeCase("foo-bar");
         * // => foo_bar
         */
        snakeCase: function(s) {
            if (_.isEmpty(s)) {
                return s;
            }

            s = s.charAt(0).toLowerCase() + s.slice(1);
            return s.replace(/[A-Z|-]/g, function(m) {
                return '_' + m.replace(/-/g, '').toLowerCase();
            });
        },

        /**
         * 去除字符串左边空格
         * @param  {String} s 
         * @return {String}   
         */
        ltrim: function(s) {
            if (_.isEmpty(s)) return s;
            return s.ltrim ? s.ltrim() : (s.trimLeft ? s.trimLeft() : s.replace(/^\s+/, ''));
        },

        /**
         * 去除字符串右边空格
         * @param  {String} s 
         * @return {String}   
         */
        rtrim: function(s) {
            if (_.isEmpty(s)) return s;
            return s.rtrim ? s.rtrim() : (s.trimRight ? s.trimRight() : s.replace(/\s+$/, ''));
        },

        /**
         * 去除字符串左右两边空格
         * @param  {String} s 
         * @return {String}   
         */
        trim: function(s) {
            if (_.isEmpty(s)) return s;
            return s.trim ? s.trim() : _.rtrim(_.ltrim(s));
        },

        /**
         * 清除字符串中的全部空格，包括头尾空格和字符串内部的空格
         * @param  {String} s 
         * @return {String}   
         */
        trimAll: function(s) {
            return (s || '').replace(/\s/g, '');
        },

        /**
         * 剥离html标签(包括&nbsp;和行尾空白)
         * @param  {String} s 
         * @return {String}   
         * @example
         * _.stripTags('<a href="#">link</a>');
         * // => "link"
         */
        stripTags: function(s) {
            return (s || '').replace(/<\/?[^>]*>/g, '').replace(/[ | ]*\n/g, '\n').replace(/&nbsp;/ig, '');
        },

        /**
         * 将HTML entities字符解码成&<>"'`
         * @param  {String} s 
         * @return {String}   
         * @example
         * _.unescape('&lt;a&gt;hello world.&lt;/a&gt;');
         * // => "<a>hello world.</a>"
         */
        unescape: function(s) {
            return (s || '').replace(/&(?:amp|lt|gt|quot|#39|#96);/g, function(chr) {
                return {
                    '&amp;': '&',
                    '&lt;': '<',
                    '&gt;': '>',
                    '&quot;': '"',
                    '&#39;': '\'',
                    '&#96;': '`'
                }[chr];
            });
        },

        /**
         * 输出从start字母或数字到second字母或数字的范围数组。
         * start和second参数必须同为字母或同为数字，不能字母与数字混和。
         * 当指定type参数，则将范围数组输出为字符串。
         * @param {String|Number} start 起始字母或数字
         * @param {String|Number} end 结束字母或数字s
         * @param {Number} [step=1] 步长
         * @param {String} [prefix] 前缀
         * @param {String} [suffix] 后缀
         * @param {String} [type="array"] 输出类型，支持的类型有：array-数组和string-字符串。默认输出数组
         * @returns {Array|String} 返回范围数组或字符串。
         * @example
         * _.range('a', 'g');
         * // => ["a", "b", "c", "d", "e", "f"]
         * _.range(10, 20);
         * // => [10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
         * _.range(10, 20, 5);
         * // => [10, 15]
         */
        range: function(start, end, step, prefix, suffix, type) {
            type = type || 'array';

            if (arguments.length === 1) {
                end = start;
                start = 0;
            }

            if (_.isUndefined(start) || _.isUndefined(end)) {
                return [];
            }

            if (_.isString(step)) {
                type = suffix;
                suffix = prefix;
                prefix = step;
                step = void 0;
            }

            var isNumber = _.isNumber(start);
            var isString = !isNumber && _.isString(start);

            if ((!isNumber && !isString) || (isNumber && !_.isNumber(end)) || (isString && !_.isString(end))) {
                return [];
            }

            if (_.isDefined(step) && !_.isNumber(step)) {
                return [];
            }

            start = isString && start.charCodeAt(0) || start;
            end = isString && end.charCodeAt(0) || end;
            step = step || 1;

            var s = [];
            var fn = function(a) {
                var v = isNumber ? a : String.fromCharCode(a);
                prefix && (v = prefix.toString() + v);
                suffix && (v = v + suffix.toString());
                return v;
            };

            do {
                s.push(fn(start));
            } while ((start += step, step > 0 ? start < end : start > end));
            return type === 'array' ? s : s.join('');
        },

        /**
         * 循环执行指定次迭代函数
         * @param  {Number} count    
         * @param  {Function} iteratee 
         * @param  {*} [args]     
         * @param  {Object} [context]  
         * @return {Array}          迭代函数返回值
         * @example
         * _.times(3, function(n){
         *  return n * 2;
         * });
         * // => [0, 2, 4]
         */
        times: function(count, iteratee, args, context) {
            count = Math.floor(+count);
            if (isNaN(count) || count < 1 || !isFinite(count)) {
                return [];
            }

            var result = [];
            for (var i = 0; i < count; i++) {
                result[i] = iteratee.apply(context, [i].concat(args));
            }
            return result;
        },

        /**
         * 延迟某时长(ms)再执行指定的函数
         * @function delay
         * @param {Number} time 
         * @param {Function} fn 
         * @param {*} [args] 
         * @param {Object} [context] 
         * @example
         * _.delay(1000, function(){
         *  alert(1);
         * });
         * // => 1s end: alert(1)
         */
        delay: (function() {
            var timer = null;
            return function(time, fn, args, context) {
                var ts = {
                    slowest: 300,
                    slower: 500,
                    slow: 1000,
                    long: 1500,
                    longer: 2000,
                    longest: 3000
                };

                timer && clearTimeout(timer), timer = null;
                timer = setTimeout(function() {
                    (clearTimeout(timer), timer = null);
                    fn.apply(context, [].concat(args));
                }, ts[time] || time);
            }
        }()),

        /**
         * 日期格式化，可以传递格式化模板来输出想要的日期格式。
         * @param {Date|Number} date 日期或时间戳（毫秒）
         * @param {String} [fmt="yyyy-MM-dd hh:mm:ss"] 格式模板，默认为"yyyy-MM-dd hh:mm:ss"。<br>支持的模板部件有：y-年份，M-月份，d-日，h-24制小时，H-12制小时，m-分，q-季度
         * @return {String} 返回格式化后的日期字符串。
         * @example
         * _.formatDate(new Date());
         * // => "2015-03-15 14:13:09"
         * _.formatDate(1426400000000, 'MM-dd yyyy')
         * // => "03-15 2015"
         */
        formatDate: function(d, fmt) {
            _.isNumber(d) && (d = new Date(d));

            if (!_.isDate(d)) {
                return '';
            }

            fmt = fmt || 'yyyy-MM-dd hh:mm:ss'; //支持的格式模板部件有：y--年份，M--月份，d--日，h--24制小时，H--12制小时，m--分，q--季度
            var o = {
                'M+': d.getMonth() + 1, //月份     
                'd+': d.getDate(), //日     
                'H+': d.getHours() % 12 === 0 ? 12 : d.getHours() % 12, //小时     
                'h+': d.getHours(), //小时     
                'm+': d.getMinutes(), //分     
                's+': d.getSeconds(), //秒     
                'q+': Math.floor((d.getMonth() + 3) / 3), //季度     
                'S': d.getMilliseconds() //毫秒     
            };
            /(y+)/.test(fmt) && (fmt = fmt.replace(RegExp.$1, (d.getFullYear() + '').substr(4 - RegExp.$1.length)));
            _.each(o, function(v, k) {
                new RegExp('(' + k + ')').test(fmt) && (fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? v : ('00' + v).substr(('' + v).length)));
            });
            return fmt;
        },

        /**
         * 返回当前时间的快捷函数
         * @return {Number} 返回时间戳(毫秒)
         */
        now: function() {
            return Date.now();
        },

        /**
         * 检测数组中是否存在指定元素
         * @param  {Array} arr 
         * @param  {*} item 
         * @return {Boolean}      
         */
        contains: function(arr, item) {
            return _.isArray(arr) ? arr.indexOf(item) > -1 : false;
        },

        /**
         * 求指定数组与其他任意多个数组的差集
         * @param {Array} arr 
         * @param {...Array} others 任意多个数组
         * @example
         * _.difference([1, 2, 3], [4, 2]);
         * // => [1, 3]
         */
        difference: function(arr, others) {
            var result = [];
            others = _.flatten(slice.call(arguments, 1), false);
            _.each(arr, function(v) {
                _.contains(others, v) || result.push(v);
            });
            return result;
        },

        /**
         * 从数组的起始索引位置开始到结束索引位置，用指定的内容填充
         * @param  {Array} arr
         * @param  {*} value
         * @param  {Number} [start=0]
         * @param  {Number} [end=arr.length]
         * @return {Array}
         * @example
         * _.fill(['a', 'b'], 'c', 1)
         * // => ["a", "c"]
         * _.fill([1, 2, 3], 'a');
         * // => ['a', 'a', 'a']
         */
        fill: function(arr, value, start, end) {
            if (!_.isArray(arr)) {
                return [];
            }

            if (_.isUndefined(start)) {
                start = 0;
            }

            if (_.isUndefined(end)) {
                end = arr.length;
            }

            for (var i = start; i < end; i++) {
                arr[i] = value;
            }

            return arr;
        },

        /**
         * 查找数组被迭代函数所匹配元素的索引值
         * @param  {Array} arr      
         * @param  {Function} iteratee 
         * @param  {Object} [context]  
         * @return {Number}          匹配元素的索引
         * @example
         * _.findIndex([1, 2, 3, 4], function(value) { return value % 2 === 0; });
         * // => 1
         */
        findIndex: function(arr, iteratee, context) {
            var i = -1;
            _.each(arr, function(item, index) {
                if (iteratee.call(context || this, item, index)) {
                    i = index;
                    return false;
                }
            });
            return i;
        },

        /**
         * 数组扁平化
         * @param {Array} arr 
         * @param {Boolean} [isDeep=false] 是否深度遍历
         * @return {Array} 返回扁平化后的新数组
         * @example
         * _.flatten([1, [2, 3, [4]]]);
         * // => [1, 2, 3, [4]]
         * _.flatten([1, [2, 3, [4]]], true);
         * // => [1, 2, 3, 4]
         */
        flatten: function(arr, isDeep) {
            var result = [];
            _.each(arr, function(v) {
                if (_.isArray(v) || _.isArrayLike(v)) {
                    push.apply(result, isDeep ? _.flatten(v, true) : v);
                    return;
                }
                result.push(v);
            });
            return result;
        },

        /**
         * 求任意多个数组的交集
         * @param {...Array} arrays 任意多个数组
         * @return {Array} 返回交集元素的数组
         * @example
         * _.intersection([1, 2], [4, 2], [2, 1]);
         * // => [2]
         */
        intersection: function(arrays) {
            var result = _.clone(arrays, true);
            _.each(slice.call(arguments, 1), function(arr) {
                var _result = [];
                _.each(arr, function(v) {
                    _.contains(result, v) && _result.push(v);
                });
                result = _result;

                if (!result.length) {
                    return false;
                }
            });
            return result;
        },

        /**
         * 从数组中剔除指定的元素(原数组同时改变，Note:不同于_.without)
         * @param  {Array} arr    
         * @param  {...*} values 
         * @return {Array}        剩余元素组成的数组
         * @example
         * _.pull([1, 2, 1, 3], 1, 2);
         * // => [3]
         */
        pull: function(arr, values) {
            values = slice.call(arguments, 1);
            _.each(values, function(v) {
                var i = -1;
                while ((i = arr.indexOf(v)) > -1) {
                    arr.splice(i, 1);
                }

                if (!arr.length) {
                    return false;
                }
            });
            return arr;
        },

        /**
         * 求任意多个数组的并集(会自动去重)
         * @param {...Array} arrays 
         * @return {Array} 返回并集元素的数组
         * @example
         * _.union([1, 2], [4, 2], [2, 1]);
         * // => [1, 2, 4]
         */
        union: function(arrays) {
            arrays = slice.call(arguments);
            return _.unique(_.flatten(arrays, false));
        },

        /**
         * 对数组元素去重。
         * @param {Array} arr
         * @param {String} [field] 根据此字段来去重，只在数组元素为字面量对象时有效
         * @returns {Array}
         * @example
         * _.unique([1, 2, 1, 4, 2]);
         * // => [1, 2, 4]
         * _.unique([{key: 1}, {key: 2}, {key: 1}, {key: 4}, {key: 2}], 'key')
         * // => [{key: 1}, {key: 2}, {key: 4}]
         */
        unique: function(arr, field) {
            if (!_.isArray(arr) || _.isEmpty(arr)) {
                return null;
            }

            var result = [];
            var cache = [];

            _.each(arr, function(item) {
                if (field) {
                    if (!_.has(item, field)) {
                        result.push(item);
                        return true;
                    }

                    if (!_.contains(cache, item[field])) {
                        result.push(item);
                        cache.push(item[field]);
                    }
                    return;
                }

                _.contains(result, item) || result.push(item);
            });

            return result;
        },

        /**
         * 从数组中剔除指定的元素(原数组不变)
         * @param  {Array} arr    
         * @param  {...*} values 
         * @return {Array}        剩余元素组成的数组
         * @example
         * _.without([1, 2, 1, 3], 1, 2);
         * // => [3]
         */
        without: function(arr, values) {
            values = slice.call(arguments, 1);
            return _.difference(arr, values);
        },

        /**
         * 根据属性路径提取对应的属性值
         * @param  {Object} obj  
         * @param  {String} path 属性路径，如"a[0].b.c"
         * @return {*}      
         * @example
         * _.get({a:[{b:{c:1}}]}, 'a[0].b.c');
         * // => 1
         * _.get({a:[{b:{c:1}}]}, 'a');
         * // => [{b:{c:1}}]
         */
        get: function(obj, path) {
            if (!obj) return null;
            if (_.isUndefined(path)) return obj;

            var keys = toPath(path);
            var result = obj;
            for (var i = 0; i < keys.length; i++) {
                result = result[keys[i]];
            }
            return result;
        },

        /**
         * 检测对象中是否存在指定的值
         * @param  {Object}  obj  
         * @param  {String}  path 属性路径，如"a[0].b.c"
         * @return {Boolean}      
         * @example
         * _.has({a:[{b:{c:1}}]}, 'a[0].b.c');
         * // => true
         * _.has({a:[{b:{c:1}}]}, 'a[0].b.e');
         * // => false
         */
        has: function(obj, path) {
            return !!_.get(obj, path);
        },

        /**
         * 返回对象所有属性名组成的数组
         * @param  {Object} obj 
         * @return {Array}     
         * @example
         * _.keys({a: 1, b: 2, c: 3});
         * // => ['a', 'b', 'c']
         */
        keys: function(obj) {
            if (Object.keys) {
                return Object.keys(obj);
            }

            var ks = [];
            for (var k in obj) {
                ks[ks.length++] = k;
            }
            return ks;
        },

        /**
         * 抛弃指定的属性，返回剩余属性组成的对象(Note:原对象不变)
         * @param {Object} obj 
         * @param {Array} keys 
         * @return {Object} 
         * @example
         * _.omit({a: 1, b: 2, c: 3}, 'b');
         * // => {a: 1, c: 3}
         * _.omit({a: 1, b: 2, c: 3, d: 4}, ['b', 'c']);
         * // => {a: 1, d: 4}
         */
        omit: function(obj, keys) {
            return _.pick(obj, keys, true);
        },

        /**
         * 将键值对编成数组
         * @param {Object} obj 
         * @return {Array} 
         * @example
         * _.pairs({ 'barney': 36, 'fred': 40 });
         * // => [['barney', 36], ['fred', 40]]
         */
        pairs: function(obj) {
            if (!_.isPlainObject(obj)) {
                return [];
            }

            var result = [];
            var keys = _.keys(obj);

            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                result[i] = [key, obj[key]];
            }
            return result;
        },

        /**
         * 挑选指定的属性
         * @param {Object} obj 
         * @param {Array} keys 
         * @return {Object} 
         * @example
         * _.pick({a: 1, b: 2, c: 3}, 'b');
         * // => {b: 2}
         * _.pick({a: 1, b: 2, c: 3, d: 4}, ['b', 'c']);
         * // => {b: 2, c: 3}
         */
        pick: function(obj, keys, _internally) {
            if (!_.isPlainObject(obj) || !keys) {
                return null;
            }

            if (!_.isArray(keys)) {
                keys = [keys];
            }

            var result = {};
            _.each(obj, function(v, k) {
                var _in = _.contains(keys, k);
                if (_internally) _in = !_in;
                _in && (result[k] = v);
            });
            return result;
        },

        /**
         * 设置属性值到指定的路径(属性)
         * @param {Object} obj   
         * @param {String} path  属性路径，如"a[0].b.c"
         * @param {*} value 
         * @example
         * var o = {a:[{b:{c:1}}]};
         * _.set(o, 'a[0].b.c', 2);
         * // => o = {a:[{b:{c:2}}]}
         */
        set: function(obj, path, value) {
            var keys = toPath(path);
            var last = keys.pop();
            obj = _.get(obj, keys);
            obj && (obj[last] = value);
        },

        /**
         * 删除指定的属性
         * @param  {Object} obj  
         * @param  {String} path 属性路径，如"a[0].b.c"
         * @example
         * _.unset({a:1, b:2, c:{d:4,e:5}},'c.e')
         * // => {a:1, b:2, c:{d:4}}
         */
        unset: function(obj, path) {
            var keys = toPath(path);
            var last = keys.pop();
            obj = _.get(obj, keys);
            if (obj) {
                delete obj[last];
            }
        },

        /**
         * 返回对象所有属性值组成的数组
         * @param  {Object} obj 
         * @return {Array}     
         * @example
         * _.keys({a: 1, b: 2, c: 3});
         * // => [1, 2, 3]
         */
        values: function(obj) {
            var vs = [];
            for (var k in obj) {
                vs[vs.length++] = obj[k];
            }
            return vs;
        },

        /**
         * 原型继承
         * @param  {Class} subClass   子类
         * @param  {Class} superClass 父类
         * @param  {...Object} [args]       子类的原型属性和方法
         */
        inherit: function(subClass, superClass, args) {
            if (superClass.prototype.constructor === Object.prototype.constructor) {
                superClass.prototype.constructor = superClass;
            }

            var F = function() {};
            F.prototype = superClass.prototype;

            var instance = new F();
            instance.constructor = subClass;
            subClass.prototype = instance;

            args = slice.call(arguments, 2);
            _.each(args, function(v) {
                _.each(v, function(value, key) {
                    instance[key] = value;
                });
            });
        },

        /**
         * 复制数据
         * @param  {*}  data   
         * @param  {Boolean} [isDeep=false] 是否深复制，默认浅复制
         * @return {*}         
         */
        clone: function(data, isDeep) {
            if (_.isNull(data)) {
                return data;
            }

            var t = typeof data;
            if (t === 'function' || _.contains(primitiveTypes, t)) {
                return data;
            }

            if (_.isArray(data)) {
                return cloneArr(data, isDeep);
            }

            return cloneObj(data, isDeep);
        },

        /**
         * 迭代集合，可中途`return false`跳出迭代
         * @param  {Array|Object} collection 
         * @param  {Function} iteratee   
         * @param  {Object} context    
         * @return {Boolean}            
         */
        each: function(collection, iteratee, context) {
            if (!_.isFunction(iteratee)) {
                return false;
            }

            var value, item;
            if (_.isPlainObject(collection)) {
                for (var k in collection) {
                    item = collection[k];
                    value = iteratee.call(context || item, item, k, collection);
                    if (value === false) break;
                }
            } else {
                for (var i = 0; i < collection.length; i++) {
                    item = collection[i];
                    value = iteratee.call(context || item, item, i, collection);
                    if (value === false) break;
                }
            }
            return !!value;
        },

        /**
         * 迭代集合，只当所有元素为真值，才能迭代完毕
         * 只要其中有一个元素不为真值，就会中途跳出迭代，并返回false
         * @param  {Array|Object} collection 
         * @param  {Function} iteratee   
         * @param  {Object} context    
         * @return {Boolean}            
         */
        every: function(collection, iteratee, context) {
            return _.each(collection, function(item, index, collection) {
                return !!iteratee.call(context || this, item, index, collection);
            });
        },

        /**
         * 迭代集合，过滤出来为真值的元素
         * @param  {Array|Object} collection  
         * @param  {Function} iteratee    
         * @param  {Object} context     
         * @return {Array|Object}     当迭代的是数组，返回为真值元素组成的数组；当迭代的是对象，返回为真值键值对组成的新对象
         */
        filter: function(collection, iteratee, context, _internally) {
            var isObj = _.isPlainObject(collection);
            var rs = isObj ? {} : [];

            if (!_.isFunction(iteratee)) {
                return rs;
            }

            _.each(collection, function(item, index) {
                if (iteratee.call(context || this, item, index)) {
                    isObj ? (rs[index] = item) : rs.push(item);
                    if (_internally) return false;
                }
            });
            return rs;
        },

        /**
         * 迭代集合，返回为真值的第一个元素，并中断迭代
         * @param  {Array|Object} collection 
         * @param  {Function} iteratee   
         * @param  {Object} context    
         * @return {*}            
         */
        find: function(collection, iteratee, context) {
            var r = _.filter(collection, iteratee, context, true);
            return _.isPlainObject(collection) ? r : r[0];
        },

        /**
         * 迭代集合，返回迭代函数返回的值
         * @param  {Array|Object} collection 
         * @param  {Function} iteratee   
         * @param  {Object} context    
         * @return {Array|Object}            
         */
        map: function(collection, iteratee, context) {
            var isObj = _.isPlainObject(collection);
            var rs = isObj ? {} : [];

            if (!_.isFunction(iteratee)) {
                return rs;
            }

            _.each(collection, function(item, index) {
                var value = iteratee.call(context || this, item, index);
                isObj ? (rs[index] = value) : rs.push(value);
            });
            return rs;
        },

        /**
         * 倒序迭代数组，可中途`return false`跳出迭代
         * @param  {Array|Object} collection 
         * @param  {Function} iteratee   
         * @param  {Object} context    
         * @return {Boolean}            
         */
        reach: function(collection, iteratee, context) {
            if (!_.isFunction(iteratee)) {
                return false;
            }

            var v;
            for (var i = collection.length - 1; i >= 0; i--) {
                var item = collection[i];
                v = iteratee.call(context || item, item, i);
                if (v === false) break;
            }
            return !!v;
        },

        /**
         * 迭代集合，过滤出来为假值的元素，与filter效果相反
         * @param  {Array|Object} collection 
         * @param  {Function} iteratee   
         * @param  {Object} context    
         * @return {Array|Object}            
         */
        reject: function(collection, iteratee, context) {
            return _.filter(collection, function(item, index) {
                return !iteratee.call(context || this, item, index);
            }, context);
        },

        /**
         * 返回集合的大小
         * @param  {Array|Object} collection 
         * @return {Number}            数组返回数组长度，对象返回键值对个数
         */
        size: function(collection) {
            if (!collection) return 0;
            return _.isArray(collection) || _.isArrayLike(collection) ? collection.length : _.keys(collection).length;
        },

        /**
         * 迭代数组，只要有一个元素为真值，就迭代完毕，并返回true，否则返回false
         * @param  {Array|Object} collection 
         * @param  {Function} iteratee   
         * @param  {Object} context    
         * @return {Boolean}            
         */
        some: function(collection, iteratee, context) {
            var result = _.find(collection, iteratee, context);
            return result && !_.isEqual(result, {}) || false;
        },

        /**
         * 检索或设置cookie
         * @param  {String} name    
         * @param  {*} value   
         * @param  {Date} expires 
         * @param  {String} path    
         * @param  {String} domain  
         * @param  {Boolean} secure  
         * @return {*}         
         */
        cookie: function(name, value, expires, path, domain, secure) {
            if (_.isUndefined(value)) { //检索
                if (_.isUndefined(name)) {
                    return _.split(document.cookie, ';');
                }

                var cookieName = encodeURIComponent(name) + '=';
                var cookieStart = document.cookie.indexOf(cookieName);
                var cookieValue = null;

                if (cookieStart > -1) {
                    var cookieEnd = document.cookie.indexOf(';', cookieStart);
                    cookieEnd === -1 && (cookieEnd = document.cookie.length);
                    cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
                }
                return cookieValue;
            }

            //设置
            var cookieText = encodeURIComponent(name) + '=' + encodeURIComponent(value);
            _.isDate(expires) && (cookieText += ';expires=' + expires.toGMTString());
            path && (cookieText += ';path=' + path);
            domain && (cookieText += ';domain=' + domain);
            secure && (cookieText += ';secure');
            document.cookie = cookieText;
        },

        /**
         * 删除指定cookie
         * @param  {String} name   
         * @param  {String} path   
         * @param  {String} domain 
         * @param  {Boolean} secure 
         */
        removeCookie: function(name, path, domain, secure) {
            _.cookie(name, '', new Date(0), path, domain, secure);
        },

        /**
         * 将对象拼接成字符串
         * @param  {Object} obj       
         * @param  {String} delimiter 连接符，默认&
         * @param  {Boolean} encode    是否编码
         * @return {String}           
         * @example
         * _.join({a: 1, b: 2});
         * // => "a=1&b=2"
         */
        join: function(obj, delimiter, encode) {
            if (_.isArray(obj)) {
                return obj.join(delimiter);
            }

            delimiter || (delimiter = '&');

            var s = '';
            _.each(obj, function(v, k) {
                s += (_.trim(k) + '=' + (encode && encodeURIComponent(v) || v));
                s += delimiter;
            });
            return s.substring(0, s.length - delimiter.length);
        },

        /**
         * 分割字符串
         * @param  {String} url       
         * @param  {String} delimiter 分隔符，默认&
         * @param  {Boolean} decode    是否解码
         * @return {Object}           
         * @example
         * _.split("a=1&b=2");
         * // => {a: "1", b: "2"}
         */
        split: function(url, delimiter, decode) {
            if (!_.isString(url)) {
                return null;
            }

            var obj = {};
            _.each(url.split(delimiter || '&'), function(v) {
                var a = v.split('=');
                var vs = decode && decodeURIComponent(a[1]) || a[1];
                /,/g.test(vs) && (vs = vs.split(','));
                obj[_.trim(a[0])] = vs;
            });
            return obj;
        },

        /**
         * 解析URL
         * @param  {string} url 
         * @return {Object} {protocol, host, port, hostWidthPort, path, directory, file, query, hash, isHttp, isHttps, isEMail}
         */
        parseURL: function(url) {
            var ret = {
                ///协议
                protocol: '',
                ///主机：域名或IP地址
                host: '',
                ///端口号
                port: '',
                ///主机和端口号
                hostWidthPort: '',
                ///文件路径(目录+文件名)
                path: '',
                ///目录(无文件名的文件路径)
                directory: '',
                ///文件名
                file: '',
                ///查询参数部件
                query: '',
                ///哈希部件
                hash: '',
                ///是否使用HTTP、HTTPS或RTMP、RTMPS协议
                isHttp: false,
                ///是否使用安全HTTPS协议
                isHttps: false,
                ///是否使用邮件MAILTO协议
                isEMail: false
            };

            if (_.isString(url) && !_.isEmpty(url)) {
                var key = ['source', 'protocol', 'hostWidthPort', 'userInfo', 'user', 'password', 'host', 'ipv4', 'ipv6', 'basename', 'domain', 'port', 'relative', 'path', 'directory', 'file', 'query', 'hash'];
                var reg = /^(?:(?![^:@]+:[^:@\/]*@)([^[:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:(\d+\.\d+\.\d+\.\d+)|\[([a-fA-F0-9:]+)\]|([^.:\/?#]*))(?:\.([^:\/?#]*))?)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;

                var m = reg.exec(url);
                var uri = {};
                var i = 18;
                while (i--) uri[key[i]] = m[i] || '';

                for (var k in ret) {
                    ret[k] = uri[k];
                }
                ret.isHttp = (ret.protocol === 'http' || ret.protocol === 'https' || ret.protocol === 'rtmp' || ret.protocol === 'rtmps');
                ret.isHttps = ret.protocol === 'https';
                ret.isEMail = ret.protocol === 'mailto';
            }

            return ret;
        },

        /**
         * 解析QueryString部分
         * @param  {String} url 
         * @return {Object}      
         * @example
         * _.parseQuery('/?_k=1mtghm&a=1&b=2')
         * // => {_k: "1mtghm", a: "1", b: "2"}
         */
        parseQuery: function(url) {
            if (!url) return {};
            return _.split(url.replace(/^.*\?/, '').replace(/\#.*$/, ''), '&', true);
        },

        /**
         * 将参数拼接为url的queryString
         * @param  {String} url    
         * @param  {Object} params 
         * @return {String}        
         * @example
         * _.queryString('/index.html', {a: 1, b: 2});
         * // => "/index.html?a=1&b=2"
         */
        queryString: function(url, params) {
            _.isPlainObject(params) && (params = _.join(params, '&', true));
            return url + (/\?/.test(url) ? '&' : '?') + params;
        },

        /**
         * 将url地址转换成连接
         * @param  {String} url    
         * @param  {String} text   连接的显示文本
         * @param  {String} target 
         * @return {String}        
         * @example
         * _.toLink('/index.html','home')
         * // => "<a target="_blank" href="/index.html">home</a>"
         */
        toLink: function(url, text, target) {
            return '<a target="' + (target || '_blank') + '" href="' + url + '">' + (text || url) + '</a>';
        }
    });

    _.uniq = _.unique;


    function isObjEqual(obj1, obj2) {
        if (!_.isPlainObject(obj2)) {
            return false;
        }

        if (!obj1 && !obj2) {
            return true;
        }

        var len1 = _.keys(obj1).length;
        var len2 = _.keys(obj2).length;

        if (!len1 && !len2) {
            return true;
        }

        if (len1 !== len2) {
            return false;
        }

        return _.each(obj1, function(v, k) {
            return _.has(obj2, k) && _.isEqual(v, obj2[k]);
        });
    }

    function isArrEqual(arr1, arr2) {
        if (!_.isArray(arr2)) {
            return false;
        }

        if (!arr1 && !arr2) {
            return true;
        }

        if (arr1.length !== arr2.length) {
            return false;
        }

        var len = arr1.length;
        while (len--) {
            if (!_.isEqual(arr1[len], arr2[len])) {
                return false;
            }
        }
        return true;
    }

    function cloneObj(obj, isDeep) {
        if (!isDeep) {
            return _.extend({}, obj);
        }

        var ret = {};
        _.each(obj, function(d, k) {
            if (_.isNull(d)) {
                ret[k] = d;
                return true;
            }

            var t = typeof d;
            if (t === 'function' || _.contains(primitiveTypes, t)) {
                ret[k] = d;
                return true;
            }

            ret[k] = _.isPlainObject(d) ? cloneObj(d, true) : cloneArr(d, true);
        });
        return ret;
    }

    function cloneArr(arr, isDeep) {
        if (!isDeep) {
            return arr.concat();
        }

        var ret = [];
        _.each(arr, function(d, i) {
            if (_.isNull(d)) {
                ret[i] = d;
                return true;
            }

            var t = typeof d;
            if (t === 'function' || _.contains(primitiveTypes, t)) {
                ret[i] = d;
                return true;
            }

            ret[i] = _.isArray(d) ? cloneArr(d, true) : cloneObj(d, true);
        });
        return ret;
    }

    function toPath(path) {
        var ps = _.isArray(path) ? path : path.match(/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g);
        for (var i = 0; i < ps.length; i++) {
            var p = ps[i];
            ps[i] = p.replace(/\[(.*)\]/g, '$1');
        }
        return ps;
    }

    window._ = _;
})();