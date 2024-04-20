import { effect } from './effect';

export const computed = (getter: Function) => {
	let dirty = true; // 缓存 只有只依赖改变才会重新发生计算
	let value;
	const options = {
		lazy: true,
		scheduler: () => {
			dirty = true;
		},
	};
	const _value = effect(getter, options);

	class ComputedRefImp {
		get value() {
			if (dirty) {
				value = _value();
				dirty = false;
			}
			return value;
		}
	}
	return new ComputedRefImp();
};
