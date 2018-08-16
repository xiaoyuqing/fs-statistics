
export default function getTime(dateStr) {
	return new Date(dateStr.replace(/-/g,'/'));
}