
let a = {
	t: '1',
	t2: '2',
};

let b = a; //объект не копируется, а просто получает ссылку на объект
a.t = '3';
b.t2 = '4';

console.log(a);
console.log(b);

console.log('right way ==================');

let a2 = {
	t: '1',
	t2: '2',
};

let b2 = {
	...a2 //копируется объект, но вложенные в него объекты остаются ссылками
};

a2.t = '3';
b2.t2 = '4';

console.log(a2);
console.log(b2);

//** TODO добавь в пример вложенные объекты */