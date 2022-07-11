
# 1.如何写一个 6px 的字体
font-size:12px;
transform: scale(0.5)

# 2.如何触发BFC 
 根元素
 float的值不为none ｜ float为 left|right
 overflow的值不为visible ｜ overflow为 hidden|auto|scroll
 display：inline-block | flex | grid | table-cell | ....
 position的值为 absolute|fixed

# 3.javascript 中所有数据类型
 基本类型
 string，number，bigint，boolean，null，undefined，symbol 
 引用类型
 Object Array  Function Data Regexp ....

# 4.如何准确的判断未知数据类型
let num = 1123
function getType (a:any) {
    return Object.prototype.toString.call(a)
}
console.log(getType(num)) // '[object Number]' 

# 5. 识别数组存在NaN
function hasNaN(arr:any[]) {
    return arr.includes(NaN);
}
# 6. 正则去空格
function removeSpace(str: string) {
    if(!str) return;
    return str.replace(/\s*/g,'');
}

# 7. 
const temp = [1,2,3,4].map(item=> item+1);
console.log(temp)
答案： [2, 3, 4, 5]

# 8。判断数组的每一项是否相等
function isEveryEqual (arr: any[]) {
    let temp = new Set(arr);
    return temp.size === 1;
}

# 9. 实现一个深拷贝
const isComplexType = (obj: any) => typeof obj === 'object' && obj !== null;
const deepClone = (obj: any,hashMap = new WeakMap()) => {
    if(obj instanceof Function) return new Function(obj);
    if(hashMap.has(obj)) return hashMap.get(obj);
    const allDesc = Object.getOwnPropertyDescriptors(obj);
    const cloneObj = Object.create(Object.getPrototypeOf(obj) ,allDesc);
    hashMap.set(obj,cloneObj);
    Reflect.ownKeys(obj).forEach(key=>{
        if(isComplexType(obj[key])) {
            cloneObj[key] = deepClone(obj[key],hashMap);
        } else {
            cloneObj[key] = obj[key];
        }
    })
    return cloneObj;
}

const temp2 = {a:[{b:undefined},{b:1},{c:()=>{console.log('6666')}}]}
let test = deepClone(temp2);

# 10. Promise.all 获取除错误返回之外的正确结果
Promise.all([
    Promise.resolve({code:200,value:1}),
    Promise.resolve({code:200,value:2}),
    Promise.reject({code:500,value:1})
].map(item=>item.catch(e=>e))).then(res=>{
    console.log(res.filter(item=>item.code === 200))
})

# 11. react 中 state 根据 props 修改 应该在哪个生命周期
 react 15 componentWillReceiveProps ，可以在这个地方修改，并且在 shouldComponentUpdate 进行优化
 此时，尚未进入render阶段
 react 16 getDerivedStateFromProps
 react 函数组件  使用 useEffect 进行对 props 的依赖去更新 state

# 12.修改commit的描述信息
 git commit --amend
 直接修改 第一行 的 666
 按下 i 修改为333后， shift + :  输入wq 回车

# 13. 实现 Promise.race 和 Promise.all

function MyPromiseRace (array: Promise<any>[]) {
    return new Promise((resolve, reject)=>{
      for (let i = 0; i< array.length; i++) {
        let current = array[i];
        //把所有的promise都执行一遍, 返回第一个结果
        if (current instanceof Promise) {
            current.then(resolve, reject)
        } 
      }
    })
}

function MyPromiseAll (array: Promise<any>[]) {
    let result: any = [];
    let index = 0;
    // 一个失败整个失败
    return new Promise((resolve, reject)=>{
      function addData<T>(key:number,value: T) {
        result[key] = value;
        index++;
        if(index === array.length) {
          resolve(result);
        }
      }
      for (let i = 0; i< array.length; i++) {
        let current = array[i];
        //把所有的promise都执行一遍
        if (current instanceof Promise) {
          current.then(value=>{
            addData<keyof typeof value>(i,value)
          },(reason)=>{
            reject(reason)
          })
        } else {
          addData(i,current)
        }
      }
    })
}