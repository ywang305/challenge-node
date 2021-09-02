
<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
       <details>
       <summary><a href="#基础">基础</a></summary>
       <ul>
        <li><a href="#扁平化">扁平化</a></li>
        <li><a href="#去除空格trim">去除空格</a></li>
        <li><a href="#全排列">全排列</a></li>
        <li><a href="#组合">组合</a></li>
        <li><a href="#归并排序">归并排序</a></li>
        <li><a href="#快速排序">Contact</a></li>
        <li><a href="#setTimeout实现setInterval">setTimeout 实现 setInterval</a></li>
        <li><a href="#防抖">防抖</a></li>
        <li><a href="#call">call</a></li>
        <li><a href="#InstanceOf">InstanceOf</a></li>
        <li><a href="#Clone">Clone</a></li>
      </ul>
      </details>
    </li>
    <li>
      <details>
      <summary><a href="#Leetcode">刷刷</a></summary>
      <ul>
        <li><a href="#39_Combination_Sum">39. Combination Sum </a></li>  
      </ul>
      </details>
    </li>

  </ol>
</details>

# 基础

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



## 去除空格trim

```js
function myTrim(str) {
    return str.replace(/(^\s+)|(\s+$)/g, ''); //将前空格和后空格替换为空
}
```

## 全排列

```
// 返回 [string], 去重
function permute(arr) {
  if (arr.length === 1) return new Set(arr);
  let res = new Set();
  for (let i = 0; i < arr.length; ++i) {
    const item = arr[i];
    const subStrs = permute(arr.slice(0, i).concat(arr.slice(i + 1)));
    subStrs.forEach((subStr) => {
      res.add(item + "," + subStr);
    });
  }
  return res;
}

const res = permute([1, 2, 1]);
console.log([...res]);
```

```
// 返回[][]， 不去重
function permute(arr) {
  if (arr.length === 1) return [arr];
  let res = [];
  for (let i = 0; i < arr.length; ++i) {
    const item = arr[i];  // 取出一个
    const subs = permute(arr.slice(0, i).concat(arr.slice(i + 1))); // 剩余递归
    subs.forEach((subArr) => {
      res.push([item, ...subArr]);  // 取出一个放到特地定位置，比如首位置
    });
  }
  return res;
}

const res = permute([1, 2, 4]);
console.log(res);
[
  [ 1, 2, 4 ],
  [ 1, 4, 2 ],
  [ 2, 1, 4 ],
  [ 2, 4, 1 ],
  [ 4, 1, 2 ],
  [ 4, 2, 1 ]
]
```

## 组合
```
// 返回 [string], 去重
function combine(arr, k) {
  if (k === 1) return arr; // [ str1, str2, str3...]

  const res = new Set(); // 去重
  for (let i = 0; i < arr.length; ++i) {
    const item = arr[i];
    const subStrs = combine(arr.slice(0, i).concat(arr.slice(i + 1)), k - 1);
    subStrs.forEach((substr) => { // Set亦可forEach
      res.add(item + "," + substr);
    });
  }
  return res;
}
console.log(combine([1, 2, 3, 3, 4], 2));
Set(13) {
  '1,2',
  '1,3',
  '1,4',
  '2,1',
  '2,3',
  '2,4',
  '3,1',
  '3,2',
  '3,3',
  '3,4',
  '4,1',
  '4,2',
  '4,3'
}

```

```
// 返回 [][] ， 不去重
function combine(arr, k) {
  if (k === 1) return arr.map((e) => [e]); // 返回当前单元素的组合 [ [e1], [e2], [e3]...]

  const res = [];
  for (let i = 0; i < arr.length; ++i) {
    const item = arr[i];
    const subArrs = combine(arr.slice(0, i).concat(arr.slice(i + 1)), k - 1);
    subArrs.forEach((arr) => {
      res.push([item, ...arr]);
    });
  }
  return res;
}

console.log(combine([1, 2, 3, 4], 2));
[
  [ 1, 2 ], [ 1, 3 ],
  [ 1, 4 ], [ 2, 1 ],
  [ 2, 3 ], [ 2, 4 ],
  [ 3, 1 ], [ 3, 2 ],
  [ 3, 4 ], [ 4, 1 ],
  [ 4, 2 ], [ 4, 3 ]
]
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

## setTimeout实现setInterval

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

## call

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

# Leetcode

## 39_Combination_Sum
