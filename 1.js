// ! 隐式转换
const str = 20 + true + null + undefined + 'string' + [] + { a: 1 };
// console.log(str);

// 1. 20 + true（Number(true)） 21
// 2. 21 + null (Number(null)） 21
// 3. 21 + undefined (Number(undefined) NaN） NaN
// 4. NaN + 'string' ('NaN' + 'string') "NaNstring"
// 5. "NaNsting" + [] ([].valueOf(), [].toString()) "NaNstring"
// 6. "NaNstring" + { a: 1 } ({ a: 1}.valueOf(), { a: 1}.toString()) "NaNstring[object Object]"

// ----------------------------------------------------------------------------

// ! typeOf 与 instanceof 的区别
// instanceof 原型判断, 只能检测引用数据类型(Object)
// typeOf 无法检测 null 和 对象 数组
// console.log([] instanceof Object);
// ! 其他方式
// constructor Object.prototype.toString.call 转换成原始类型
// console.log(
// 	Object.prototype.toString.call([]).replace(/^\[object (\S+)\]$/, '$1')
// );

// ----------------------------------------------------------------------------

// ! 原型
class Person {
	constructor() {
		this.name = 'jack';
		this.age = 18;
		this.sing = () => {
			// console.log('唱歌');
		};
	}
}

const a = new Person();
// console.log(a.__proto__ === Person.prototype); // true
// console.log(a.__proto__.constructor === Person); // true

// ----------------------------------------------------------------------------

// ! 手写new操作符
function myNew(fn, ...args) {
	// 1.创建新对象 2.新对象原型指向构造函数原型对象
	const obj = Object.create(fn.prototype);
	// 3.将构造函数的this指向新对象
	const res = fn.apply(obj, args);
	// 4.返回新对象
	return res instanceof Object ? res : obj;
}

function People(name, age) {
	this.name = name;
	this.age = age;
}

// console.log(myNew(People, 'jack', 18));

// ----------------------------------------------------------------------------

// ! call,bind,apply
// call(指向，参数1，参数2...)
// bind(指向,参数1，参数2...) 不会立即执行,返回的是改变指向后的函数,需要手动执行
// apply(指向,[参数1，参数2...])

// ----------------------------------------------------------------------------

// ! 事件循环
// 176824359 11 10 12

// console.log('1');

// setTimeout(function () {
// 	console.log('2');

// 	process.nextTick(function () {
// 		console.log('3');
// 	});

// 	new Promise(function (resolve) {
// 		console.log('4');

// 		resolve();
// 	}).then(function () {
// 		console.log('5');
// 	});
// });

// process.nextTick(function () {
// 	console.log('6');
// });

// new Promise(function (resolve) {
// 	console.log('7');
// 	resolve();
// }).then(function () {
// 	console.log('8');
// });

// setTimeout(function () {
// 	console.log('9');

// 	process.nextTick(function () {
// 		console.log('10');
// 	});

// 	new Promise(function (resolve) {
// 		console.log('11');

// 		resolve();
// 	}).then(function () {
// 		console.log('12');
// 	});
// });

// ----------------------------------------------------------------------------
