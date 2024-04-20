import { tracker, trigger } from './effect';

// 因为 Proxy 只能代理对象, 所以reactive只能代理引用类型
// handler 13个api
// 1. 调用函数之前 apply
// 2. ownKeys拦截 for in
// 3. construct拦截 new
// 4. deleteProperty拦截 delete

// 与 proxy 对应的是 Reflect(全局对象,13个api),可配合一起使用
// delete 替换成 Reflect.deleteProperty(target,key)
export const reactive = <T extends object>(value: T) => {
	return new Proxy(value, {
		// 收集依赖
		get(target, key, receiver) {
			let res = Reflect.get(target, key, receiver);
			tracker(target, key);
			return res;
		},
		// receiver 对象自身,保证 proxy 嵌套 函数嵌套
		// 更新依赖
		set(target, key, newValue, receiver) {
			let res = Reflect.set(target, key, newValue, receiver);
			trigger(target, key);
			return res;
		},
	});
};
