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

## 深拷贝

```js
function copy(obj, appeard = new Map()) {
    if (!(obj instanceof Object)) return obj; //如果是原始数据类型
    if (appeard.has(obj)) return appeard.get(obj); //如果已经出现过

    let result = Array.isArray(obj) ? [] : {};
    appeard.set(obj, result); //将新对象放入map

    //遍历所有属性进行递归拷贝
    [...Object.keys(obj), ...Object.getOwnPropertySymbols(obj)].forEach(
        key => (result[key] = copy(obj[key], appeard))
    );

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
