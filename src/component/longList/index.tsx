import { FC, useMemo, useState, useRef } from 'react';
const data = new Array(100).fill(0).map((item,index)=>({idx:index}));
const ITEM_HEIGHT = 50;
const scrollViewHeight = ITEM_HEIGHT * 100;
// 页面容器高度
const SCROLL_VIEW_HEIGHT: number = 500;
// 预加载数量
const PRE_LOAD_COUNT: number = SCROLL_VIEW_HEIGHT / ITEM_HEIGHT;
function LongList<FC>() {
    const [ showRange, setShowPageRange ] = useState({start:0,end:PRE_LOAD_COUNT});
    const [ sourceData, setSourceData ] = useState(data);
    /**
     * 计算当前是否已经到底底部
     * @returns 是否到达底部
     */
    const reachScrollBottom = (): boolean => {
        //滚动条距离顶部
        const contentScrollTop = containerRef.current?.scrollTop || 0; 
        //可视区域
        const clientHeight = containerRef.current?.clientHeight || 0; 
        //滚动条内容的总高度
        const scrollHeight = containerRef.current?.scrollHeight || 0;
        if (contentScrollTop + clientHeight >= scrollHeight) {
            return true;
        }
        return false;
    };
  
    /**
     * scrollView 偏移量
     */
    // 网上滚的时候，页面上没有真实元素，要撑开这个高度，
    // 但是撑开后，总高度要保持不变，那么就需要减去这个 撑开的高度 啦
    const scrollViewOffset = useMemo(() => {
        // console.log(showRange.start, "showRange.start");
        return showRange.start * ITEM_HEIGHT;
    }, [showRange.start]);
  
    const containerRef = useRef<HTMLDivElement | null>(null);

    const currentViewList = useMemo(() => {
        // console.log(showRange.end)
        return sourceData.slice(showRange.start, showRange.end);
    }, [showRange, sourceData]);

    const onContainerScroll = (event:any) => {
        event.preventDefault();
        let length = sourceData.length;
        if (reachScrollBottom()) {
            // 模拟数据添加，实际上是 await 异步请求做为数据的添加
            let endIndex = showRange.end;
            let pushData: any = [];
            for (let index = 0; index < 20; index++) {
                pushData.push({idx:endIndex++});
            }
            length += 20;
            setSourceData((arr) => {
                return [...arr, ...pushData];
            });
        }
        calculateRange(length);
    };

    const calculateRange = (length:number) => {
        const element = containerRef.current;
        if (element) {
            // 看看已经滚上去了多少
            const offset: number = Math.floor(element.scrollTop / ITEM_HEIGHT) + 1;
            // console.log(offset, "offset");
            // 看看现在这个容器里还能放多少
            const viewItemSize: number = Math.ceil(SCROLL_VIEW_HEIGHT / ITEM_HEIGHT);
            // 从哪开始呢，从滚上去的位置加上一个预加载的数量开始
            const startSize: number = offset - PRE_LOAD_COUNT;
            // 从哪结束呢，从当前的位置 加上这一屏显示的数量 加上 预加载的数量
            const endSize: number = offset + viewItemSize + PRE_LOAD_COUNT;
            setShowPageRange({
                start: startSize < 0 ? 0 : startSize,
                end: endSize > length ? length : endSize,
            });
        }
    };
      
    return (
        <div
            ref = {containerRef}
            style={{
                overflow: "auto",
                height: SCROLL_VIEW_HEIGHT,
            }}
            onScroll={onContainerScroll}
        >
            <div
                style={{
                    width: "100%",
                    height: scrollViewHeight - scrollViewOffset,
                    marginTop: scrollViewOffset,
                }}
            >
                {currentViewList.map(item=>{
                    return <div key={item.idx}  style={{height:ITEM_HEIGHT}}>current position{item.idx}</div>
                })}
            </div>
        </div>
    )
}

export default LongList;