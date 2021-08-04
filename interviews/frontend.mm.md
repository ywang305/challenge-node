## 扁平化

```js
function flatten(arr) {
    let result = [];
    for (let i = 0, len = arr.length; i < len; i++) {
        if (Array.isArray(arr[i])) {
            result = result.concat(flatten(arr[i]));
        } else {
            result.push(arr[i]);
        }
    }
    return result;
}
```



## 去除空格 - trim()

```js
function myTrim(str) {
    return str.replace(/(^\s+)|(\s+$)/g, ''); //将前空格和后空格替换为空
}
```

## 字符串全排列

```js
function combine(str) {
    //抽出一个字符s,对其余的进行排列,将s放在每种排列开头
    if (str.length === 1) return [str];
    let results = [];
    for (let i in str) {
        for (let s of combine(str.slice(0, i) + str.slice(1 + +i))) {
            results.push(str[i] + s);
        }
    }
    //可能会出现类似"aa"=>[aa,aa,aa,aa]的情况,需要去重
    return [...new Set(results)];
}
```

## 归并排序

```js
function sort(arr) {
    if (arr.length === 1) return arr;

    //分成两部分
    let mid = Math.floor(arr.length / 2);
    let [part1, part2] = [sort(arr.slice(0, mid)), sort(arr.slice(mid))];

    //对比+合并
    let result = [];
    while (part1.length > 0 && part2.length > 0)
        result.push((part1[0] < part2[0] ? part1 : part2).shift());
    return [...result, ...part1, ...part2];
}
```

## 快速排序

```js
function sort(arr) {
    if (arr.length <= 1) return arr;

    //选基准值
    let mid_pos = arr.length >> 1;
    let mid = arr.splice(mid_pos, 1)[0];

    let left = [],
        right = [];

    //和基准值比较,分别插入left,right数组
    arr.forEach(item => (item <= mid ? left : right).push(item));

    return [...sort(left), mid, ...sort(right)]; //递归调用排序
}
```

## setTimeout 实现 setInterval

```js
function myInterval(fn, interval, ...args) {
    let context = this;
    setTimeout(() => {
        fn.apply(context, args);
        myInterval(fn, interval, ...args); //别忘了为它传入参数
    }, interval);
}

myInterval(num => console.log(num), 500, 10);
```

## 防抖

```js
function debounce(fn, delay) {
    let timer = null;
    return function () {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => fn.call(...arguments), delay); //别忘了为它传入参数
    };
}
```

## call()

```js
Function.prototype.myCall = function (context, ...args) {
    context.fn = this;
    let result = context.fn(...args);
    delete context.fn;
    return result;
};
```

## InstanceOf

```js
function myInstanceOf(son, fatherType) {
    //沿着父亲的原型链向上查找是否有儿子的原型
    if (!son.__proto__ || !fatherType.prototype) return false;
    if (son.__proto__ === fatherType.prototype) return true;
    return myInstanceOf(son, fatherType.prototype);
}

myInstanceOf([], Array); // true
```

## Clone
```js
function cloneDeep(target,map = new WeakMap()) {
  if(typeOf taret ==='object'){
     let cloneTarget = Array.isArray(target) ? [] : {};
      
     if(map.get(target)) {
        return target;
    }
     map.set(target, cloneTarget);
     for(const key in target){
        cloneTarget[key] = cloneDeep(target[key], map);
     }
     return cloneTarget
  }else{
       return target
  }
 
}

```
