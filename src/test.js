// function numberOfShelves( N ) {
//     // write code here
//     let res = new Array(N);
//     for(let i=0;i<res.length;i++) {
//         res[i] = new Array(N).fill(0);
//     }
//     let left = 0;
//     let right = N - 1;
//     let top = 0;
//     let bottom = N - 1;
//     let num = 1;
//     while(left<=right || top<=bottom) {
//         for(let i=top;i<=bottom;i++) {
//             res[i][left] = num;
//             num++;
//         }
//         bottom--;
//         left++;

//         if(left>right || top>bottom) break;
//         for(let i=left,j=bottom;i<=right || j>=top;) {
//             res[j][i] = num;
//             num++;
//             ++i;
//             --j;
//         }
//         right--;
//         bottom--;
//         if(left>right || top>bottom) break;
//         for(let i=right; i>=left;i--){
//             res[top][i] = num;
//             num++;
//         }
//         top++;
//         right--;
//     }
    
//     let allRes = []
//     for(let i=0;i<res.length;i++) {
//         for(let j=0;j<res[i].length;j++) {
//             if(res[i][j] !== 0 ) {
//                 allRes.push(res[i][j]);
//                 console.log(res[i][j]);
//             }
//         }
//     }
//     return allRes;
// }

// console.log(numberOfShelves(5));

var lenLongestFibSubseq = function(arr) {
    const indices = new Map();
    const n = arr.length;
    for (let i = 0; i < n; i++) {
        indices.set(arr[i], i);
    }
    const dp = new Array(n).fill(0).map(() => new Array(n).fill(0));
    let ans = 0;
    for (let i = 0; i < n; i++) {
        for (let j = n - 1; j >= 0; j--) {
            if (arr[j] * 2 <= arr[i]) {
                conosle.log(i)
                break;
            }
            if (indices.has(arr[i] - arr[j])) {
                const k = indices.get(arr[i] - arr[j]);
                dp[j][i] = Math.max(dp[k][j] + 1, 3);
                ans = Math.max(ans, dp[j][i]);
            }
        }
    }
    return ans;
};
const a = [1,2,3,4,5,6,7,8]
console.log(lenLongestFibSubseq(a))