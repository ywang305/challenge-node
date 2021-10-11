
<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#H_Index_275_二分动态target">H Index 275 二分动态target</a></li>


  </ol>
</details>


### H_Index_275_二分动态target
```js
/* e.g. :  citations = [1,2,6,7,8,9], 答案 4
    二分搜索过程 
    (1) m = 2， val = 6， target是包括6的右边论文数量： 6-2 = 4
        val>target, 6 > 4,  val 6 is invalid, 向左搜索 j=m-1
    (2) m = 0, val = 1, target = 6-0 = 6
        val < target:  this val is valid but not optimal， 向右搜 i=m+1
    (3) m = 1, val = 2, target = 6-1 = 5
        val < target, valid not optimal, 向右 i=m+1, 但是下一轮i>j 结束
    二分搜索结束说明未找到最右解，
    则最右解就是 len-i = 6-2 ，也就是 6，7，8，9 的长度
    
    e.g.2 : citations = [0,1,3,5,6]
    二分搜索过程
    ...
    m = 2, val = 3, 大于等于3的论文数量 target = len-m = 5-2 = 3
    val === taret, 此时 target 就是最优解, 
    (可以推想再往左搜索，val可能变小<target变大 -> 非最优； 再往右，val可能变大>target变小-> invalid）
   
  ref:  https://www.youtube.com/watch?v=CjKJDloMnwE
*/
var hIndex = function(citations /* 有序 */) {
    const len = citations.length;
    let i = 0, j=len-1;
    while(i<=j) {
        const m = i+Math.floor((j-i)/2);
        let target = len-m; // target每次变! the num of paper in range [mid ... end]
        if(citations[m]<target) {  invalid
            i = m+1;
        } else if(citations[m]>target) { // valid but not optimal
            j = m-1;
        } else { // valid and optimal, return
            return target;
        }
    }
    return len-i;
};
```
