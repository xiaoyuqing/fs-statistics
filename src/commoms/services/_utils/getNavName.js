
// 得到navfilter上参数名
export default function getNavName(eData, APICONF, type){
	if (eData && eData[type]) {
		var lastIndex = APICONF.data[type].lastIndexOf('_'); 
		eData[type] = APICONF.data[type].slice(0, lastIndex) + '_' + eData[type];
		return eData;
	}
}