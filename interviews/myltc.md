
<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#二分法">二分法</a></li>
    <li><a href="#UnionFind">UnionFind</a></li>
    <li><a href="#Trie">Trie</a></li>
    <li><a href="#Topology">Topology</a></li>
    <li><a href="#Freqency">Freqency</a></li>
    <li><a href="#Longest">Longest</a></li>
    <li><a href="#K">K</a></li>
    <li><a href="#数组">数组</a></li>
  </ol>
</details>


### 二分法 

- H_Index_275_二分动态target
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

- median-of-two-sorted-arrays_4_二分_此消彼长
      
```js
/**
e.g.  nums1 = [1,2,3,4,5,6,7] 
      nums2 = [1,2,3,4]
      len = 11,  half_len = 5, 最终因该 [1,1,2,2,3, `3`, 4,4,5,6,7]
      
      对nums2二分搜：
        (1) m=1, m+1对应nums2的左侧切取长度，则nums1左侧切取长度=halfe_len-m-1,
            判断 nums2截取点的值 <= nums1截取点之下一位的值, versa vice , 判断 nums1截取点的值 <= nums2截取点之下一位的值
            注意 num2[m+1] could be overflow
        
      
    ref: https://www.youtube.com/watch?v=q6IEA26hvXc

**/
var findMedianSortedArrays = function(nums1, nums2) {
    if(nums1.length<nums2.length) return findMedianSortedArrays(nums2, nums1);
    
    const len = nums1.length+nums2.length, halfLen = Math.floor(len/2);
    
    let i=0, j=nums2.length-1;
    let nums2LeftLen=0, nums1LeftLen=halfLen;
    while(i<=j) {
        let m = i+Math.floor((j-i)/2);
        const _nums1LeftLen = halfLen-m-1;
        if (nums2[m] <= nums1[_nums1LeftLen] 
                /* 以下注意超界判断 */
                && (nums1[_nums1LeftLen-1]??-Infinity)<=(nums2[m+1]??Infinity)) {
            nums1LeftLen = _nums1LeftLen;
            nums2LeftLen = m+1;
            break;
        }
        if(nums2[m]>nums1[_nums1LeftLen]) {
            j = m-1;
        } else {
            i = m+1;
        }
    }
    
    if(len%2) { // odd length 
        /* 以下注意超界判断 */
        return Math.min(nums1[nums1LeftLen], nums2[nums2LeftLen]??Infinity)
    } else {
        /* 以下注意超界判断 */
        return (Math.max(nums1[nums1LeftLen-1]??-Infinity, nums2[nums2LeftLen-1]??-Infinity) + Math.min(nums1[nums1LeftLen]??Infinity, nums2[nums2LeftLen]??Infinity))/2;
    }
};
```

### UnionFind

### Trie

### Topology

### Freqency

### Longest

### K

### 数组
