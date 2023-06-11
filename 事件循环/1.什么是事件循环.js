// 从js引擎中取出一些需要异步执行的代码方放到事件队列中，然后某一时机进行执行


// 宏任务：定时器-ajax-dom-ui渲染-process.nextTick
// 微任务：queueMicrotask-Promise.then-MutationOberver
// 执行任何宏任务之前，确保微任务队列已清空

// node事件循环
// main - nexttick - timer -poll -check -close
// 主线程 - tick-setTimeout/setInterval-IO-setImmediate-close事件