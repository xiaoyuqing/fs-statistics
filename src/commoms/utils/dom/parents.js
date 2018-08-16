//实现parents的方法。
export default function parents($elem, selector) {
	var p = $elem.parent();
	var $str = selector.slice(1);
    var allParents = [];
	while (p.length > 0 && p[0].nodeType !== 9) {//不寻找document节点
		if (p[0].nodeName.toLowerCase() === 'body') {//最多查询到 body节点
		  break;
		}
		allParents.push(p);
		p = p.parent();
	}

	for (var i = 0; i < allParents.length; i++) {
		if (allParents[i].hasClass($str)) {
			return allParents[i];
		}
	}
	return false;
}
