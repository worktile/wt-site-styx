import { BindTargetType } from './interface'

export const getElementsByCss = (cssStr: string) => {
  if (document.querySelectorAll) {
    return document.querySelectorAll(cssStr)
  } else {
    const style = document.createElement('style')
    const elements = []
    let ele

    document.documentElement.firstChild && document.documentElement.firstChild.appendChild(style)
    ;(document as any)._qsa = []
    ;(style as any).styleSheet.cssText = cssStr + '{x-qsa:expression(document._qsa && document._qsa.push(this))}'
    window.scrollBy(0, 0) // 滚动条滑到最上方
    style.parentNode && style.parentNode.removeChild(style)

    while ((document as any)._qsa.length) {
      ele = (document as any)._qsa.shift()
      ele.style.removeAttribute('x-qsa')
      elements.push(ele)
    }
    ;(document as any)._qsa = null
    return elements
  }
}

export const bindEventFunc = (obj: BindTargetType, eventStr: string, func: (e: Event) => any) => {
  if (obj.addEventListener) { // 大多数浏览器支持, IE8 及以下不支持
    obj.addEventListener(eventStr, func, false) // false 指定在捕获的阶段的时候不触发事件
  } else { // IE5 - IE10 支持
    obj.attachEvent &&
    obj.attachEvent('on' + eventStr, (e: Event) => {
      func && func.call(obj, e)
    })
  }
}

export const bindTapEvent = (dom: HTMLElement, callback: (e: Event) => any) => {
  let startTime = 0;
  let isMove = false;

  bindEventFunc(dom, 'touchstart',function(){
    startTime = Date.now();
  });

  bindEventFunc(dom, 'touchmove',function(){
    isMove = true;
  });

  bindEventFunc(dom, 'touchend',function(e){
    if ((Date.now()-startTime) < 250 && isMove == false) {
      callback && callback.call(dom, e)
    }
    isMove = false;
    startTime = 0;
  });
};

export const addClass = (ele: HTMLElement, className: string) => {
  const reg = new RegExp('\\b' + className + '\\b')
  if (!reg.test(ele.className)) {
    // 如果元素 ele 不包含 className
    ele.className += ' ' + className
  }
}

export const removeClass = (ele: HTMLElement, className: string) => {
  if (ele && ele.className) {
    const reg = new RegExp('\\b' + className + '\\b')
    const classes = ele.className
    ele.className = classes.replace(reg, '')
    if (/^\s*$/g.test(ele.className)) {
      ele.removeAttribute('class')
    }
  } else {
    ele && ele.removeAttribute('class')
  }
}

export const toggleClass = (ele: HTMLElement, className: string) => {
  if (ele.className) {
    let reg = new RegExp('\\b' + className + '\\b');
    if (!reg.test(ele.className)) { // 如果元素 ele 不包含 className
      ele.className += ' ' + className;
    } else {
      let classes = ele.className;
      ele.className = classes.replace(reg, '');

      if (/^\s*$/g.test(ele.className)) { // 如果元素的 class 为空, 则清除 class 属性
        ele.removeAttribute('class');
      }
    }
  } else { // 如果元素的 className 属性不存在, 则清除 class 属性
    ele.removeAttribute('class');
  }
}
