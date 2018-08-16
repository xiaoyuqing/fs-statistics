export default function calcByDpr(base){
	var dpr = document.getElementsByTagName('html')[0].getAttribute('data-dpr');
		switch(+dpr){
			case 1:
				return base;
			case 2:
				return base * 2;
			case 3:
				return base * 3;
		}
}