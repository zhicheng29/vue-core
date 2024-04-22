import { reactive } from './vue-core/reactivity/reactive';
import { effect } from './vue-core/reactivity/effect';
import { computed } from './vue-core/reactivity/computed';
import { watch } from './vue-core/reactivity/watch';
import { ref } from './vue-core/reactivity/ref';

const app = document.querySelector('#app')!;

// !ref
const num = ref<string>('1');
const obj = ref({
	name: 'nothing',
});

effect(() => {
	app.innerHTML = num.value + obj.value.name;
});
setTimeout(() => {
	num.value = '2';
	obj.value.name = 'nothing2';
	console.log(num, obj);
}, 1000);

// 只能接受引用类型 数组 对象 object
// const obj = reactive({
// 	name: 'nothing',
// 	age: 18,
// 	sing: '唱歌',
// });

// !watch
// watch(obj, (newVal, oldVal) => {
// 	console.log(newVal, oldVal);
// });

// watch(
// 	() => obj.name,
// 	(newVal, oldVal) => {
// 		console.log(newVal, oldVal);
// 	},
// 	{
// 		immediate: true,
// 	}
// );

// obj.name = 'hello nothing';

// !computed
// let name = computed(() => {
// 	console.log('计算了一次');
// 	return obj.name;
// });
// 修改值依赖值之前必须要触发一次收集依赖吗?
// 需要触发一次 effect 依赖收集(name.value),后续更改依赖值才会生效

// console.log(name.value);
// obj.name = 'hello nothing';

// !effect
// obj.name = 'hello nothing';
// console.log(name.value);

// effect(() => {
// 	// dom 和 数据 连接
// 	app.innerHTML = obj.name + obj.age + obj.sing;
// });

// 触发了 更新依赖副作用函数 effect, 重新触发了收集依赖
// obj.name = 'hello';

// setTimeout(() => {
// obj.name = 'hello';
// setTimeout(() => {
// 	obj.age = 20;
// }, 1000);
// }, 1000);
