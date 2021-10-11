```js
var hIndex = function(citations) {
    citations.sort((a,b)=>a-b);
    const len = citations.length;
    
    for(let i=len; i>=0; --i) {
        const cntRight = len -i;
        if(citations[i]===cntRight) return citations[i]; //最优
        if(citations[i]<cntRight) { //非最优解
            return cntRight-1;
        }
    }
    
    return len;
};
```
