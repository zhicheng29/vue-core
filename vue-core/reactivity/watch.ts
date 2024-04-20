import { effect } from './effect';
interface Options {
	immediate?: boolean;
	flush?: 'sync' | 'post' | 'pre';
}

const traverse = (target, seen = new Set()) => {
	if (typeof target !== 'object' || target === null || seen.has(target))
		return;

	seen.add(target);
	for (let key in target) {
		traverse(target[key], seen);
	}
	return target;
};

export const watch = (target: any, cb: Function, options?: Options) => {
	// 1. 格式化参数 格式化成 geetter 函数 => effect
	let getter: Function;
	if (typeof target === 'function') {
		getter = target;
	} else {
		// 如果监听的是对象,需要拍平
		getter = () => traverse(target);
	}
	// 2. 返回值
	let newVal, oldVal;
	const job = () => {
		newVal = effectFn();
		cb(newVal, oldVal);
		oldVal = newVal;
	};
	// 2.依赖发生变化执行job
	const effectFn = effect(getter, {
		lazy: true,
		scheduler: job,
	});
	// 3. 参数immediate
	if (options && options!.immediate) {
		job();
	} else {
		oldVal = effectFn();
	}
};
