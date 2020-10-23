import '../assets/scss/header.scss';
import {addClass, bindEventFunc, getElementsByCss, removeClass} from "../assets/ts/utils"; // 引入样式文件

bindEventFunc(window, 'DOMContentLoaded', function () {
    let hasDrainage = true;

    bindEventFunc(document, 'scroll', (e) => {
        const headerELe = getElementsByCss('.header-section')[0];
        const activeClass = hasDrainage ? 'open-drainage' : 'touch-top';
        if (headerELe) {
            const nowIsTop = headerELe.getBoundingClientRect().top === 0;
            if (nowIsTop) {
                addClass(headerELe, activeClass);
            } else {
                removeClass(headerELe, activeClass);
            }
        }
    });

    const eleDrainageClose = getElementsByCss('.drainage-close')[0];
    bindEventFunc(eleDrainageClose, 'click', (e) => {
        hasDrainage = false;

        const headerELe = getElementsByCss('.header-section')[0];
        removeClass(headerELe, 'open-drainage');
        addClass(headerELe, 'touch-top');
    })
})
