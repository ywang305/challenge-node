
<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#H_Index_275_二分动态target">H Index 275 二分动态target</a></li>


  </ol>
</details>


### H_Index_275_二分动态target
```js
// e.g. :  citations = [1,2,6,7,8,9], 答案 4
var hIndex = function(citations /* 有序 */) {
    const len = citations.length;
    let i = 0, j=len-1;
    while(i<=j) {
        const m = i+Math.floor((j-i)/2);
        let target = len-m; // target每次变! the num of paper in range [mid ... end]
        if(citations[m]<target) {
            i = m+1;
        } else if(citations[m]>target) {
            j = m-1;
        } else {
            return citations[m];
        }
    }
    return len-i;
};
```
