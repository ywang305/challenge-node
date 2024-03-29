
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
    <li><a href="#字串">字串</a></li>
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

- [153.find-minimum-in-rotated-sorted-array](./153.find-minimum-in-rotated-sorted-array.js)
- [154.find-minimum-in-rotated-sorted-array-ii](./154.find-minimum-in-rotated-sorted-array-ii.js)


### UnionFind

### Trie

### Topology

### Freqency

### Longest
- [159.longest-substring-with-at-most-two-distinct-character](https://githleetcode.com/problems/longest-substring-with-at-most-two-distinct-characters/)\
  Sliding Window， Memo： each element最大的index

### K

### 数组 (DP,Greedy)
- [134. Gas Station](https://leetcode.com/problems/gas-station/) : 此题给定唯一解，Greedy
  ```
  累计remain = 总加油-总消耗 >= 0,  唯一解， -> 可以直接从i=0遍历
  ```
- [135. Candy](https://leetcode.com/problems/candy/) : greedy, 分别从两边推算
  ```
  贪婪法应该是tricky最灵活的，就看IQ能不能反应过来了
  ```
- 
### 字串 (DP,Greedy)
- [128. Longest Consecutive Sequence](https://leetcode.com/problems/longest-consecutive-sequence/) UnionFind,对每个元素计数root
  
- [131. Palindrome Partitioning](https://leetcode.com/problems/palindrome-partitioning/)\
 DP + DFS
  ```js
  // DP 判断 isPalindrome
   for(let j=0; j<len; ++j) {
        for(let i=0; i<=j; ++i) { // i 从 0-> j or j->0 都可以
            dp[i][j] = s[i]===s[j] && (j-i<=2 || dp[i+1][j-1]);
        }
    }
  ```
- [132 Palindrome Partitioning II 最小回文分割数](https://leetcode.com/problems/palindrome-partitioning-ii/) :  两个 DP
  ```js
  dp2[j] = Math.min(dp2[j], dp2[i-1]+1); 
          // dp2[i-1]+1解释: 已知i->j是回文，所以[0,i-1] 和 [i,j]之间增加一个分割
          // e.g. xabba,  to deduce dp2[4]
          //.     dp2[0]=0,  index 1->4 is palindrome, so there is no parition for the range,
          //      so a parition stay between 0 and 1,  such that dp2[4] = dp2[0] + 1 = 1
  ```
- [139. Word Break 字符串是否可分割](https://leetcode.com/problems/word-break/submissions/) 经典 DP
  ```js
  //dp[i]：s的[0, i)是否可以分割， 设初始[0,0)为空字符串true
  dp[j] = dp[i] && dict.has(s.slice(i, j));
  ```
- [300. Longest Increasing Subsequence](https://leetcode.com/problems/longest-increasing-subsequence/) 经典 DP
- [516. Longest Palindromic Subsequence](https://leetcode.com/problems/longest-palindromic-subsequence/) TODO
- [1143. Longest Common Subsequence](https://leetcode.com/problems/longest-common-subsequence/)
  ```rb
  def longest_common_subsequence(text1, text2)
    dp = Array.new(text1.size + 1) { Array.new(text2.size + 1, 0) }
    text1.size.times do |i|
      text2.size.times do |j|
        dp[i + 1][j + 1] = if text1[i] == text2[j]
                             dp[i][j] + 1
                           else
                             [dp[i + 1][j], dp[i][j + 1]].max
                           end
      end
    end
    dp.last.last
  end
  ```
- [todo]
