import '../assets/scss/footer.scss'; // 引入样式文件
import {bindEventFunc, getElementsByCss, bindTapEvent, toggleClass} from "../assets/ts/utils"; // 引入样式文件

bindEventFunc(window, 'DOMContentLoaded', function () {
    const eleFooterHrefList = getElementsByCss('.footer-href-layout')[0];
    bindTapEvent(eleFooterHrefList, (e) => {
        let eleTarget: HTMLElement | null = e.target as HTMLElement;
        try {
            while(
                eleTarget
                && (
                    !eleTarget.className
                    || (['svg', 'path', 'SVG', 'PATH'].includes(eleTarget.tagName)
                    || !eleTarget.className.includes('footer-column-title')))
            ) {
                eleTarget = eleTarget.parentElement
            }
            if (eleTarget && eleTarget.parentElement) {
                toggleClass(eleTarget.parentElement, 'active');
            }
        } catch (e) {
        }

    });
})
