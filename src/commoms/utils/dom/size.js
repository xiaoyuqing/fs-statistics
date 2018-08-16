
export default function elemSize(elem, sname, size) {

    if (!elem) {
        return;
    }
    var firstLetterUpper = sname.slice(0, 1).toUpperCase() + sname.slice(1);

    if (arguments.length == 3) {
        elem.style[sname] = size + 'px';
    } else {
        if (elem.document === document) {
            return elem['inner' + firstLetterUpper];
        } else if (elem.nodeType === 9) {
            return document.documentElement['client' + firstLetterUpper];
        } else {
            setTimeout(() => {
                var height = parseInt(getComputedStyle(elem, null)[sname]);
                return parseInt(height);
            }, 100)
        }
    }
}
