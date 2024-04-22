// 副作用函数(effect) 绑定dom和数据 数据变了通知 effect 更新
// 副作用函数:外部修改会影响内部
// 纯函数:外部变了内部不受影响

// 配置项 解决 computed 的首次调用与缓存问题
interface Options {
	lazy: boolean;
	scheduler: () => void;
}

// 储存函数
let activeEffect;

export const effect = (fn: Function, options?: Options) => {
	const _effect = () => {
		// 储存更新函数
		activeEffect = _effect;
		const res = fn();
		return res;
	};
	_effect.options = options; // 因为trigger的时候要用
	if (options?.lazy) {
		// 如果是lazy(computed) 不调用
	} else {
		// 如果不是lazy 自动调用
		_effect();
	}
	return _effect;
};

// !容器存放依赖
// 用法 WeakMap 只能是对象不能是其他的
// 不能遍历 弱引用不稳定(垃圾回收200-300ms)
// 不影响使用

// 收集依赖
let targetMap = new WeakMap();
// targetMap = {key:target,value:new Map()}
// targetMap.value = {key:key,value:new Set()}
export const tracker = (target, key) => {
	let depsMap = targetMap.get(target);
	// 因为第一次没有值,给定一个默认值
	if (!depsMap) {
		depsMap = new Map();
		targetMap.set(target, depsMap);
	}
	// 默认值
	let deps = depsMap.get(key);
	if (!deps) {
		deps = new Set();
		depsMap.set(key, deps);
	}
	deps.add(activeEffect);
};

// 更新依赖
export const trigger = (target, key) => {
	let depsMap = targetMap.get(target);
	let deps = depsMap.get(key);
	deps.forEach((effect) => {
		effect();
		if (effect?.options?.scheduler) {
			effect.options.scheduler(effect);
		} else {
			effect();
		}
	});
};
