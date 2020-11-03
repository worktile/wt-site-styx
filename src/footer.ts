import './styles/footer.scss'; // 引入样式文件

const initFooterWT = () => {
    window && window.addEventListener('DOMContentLoaded', function (e) {
        const eleFooterHrefList = document.querySelector('.footer-href-layout');
        eleFooterHrefList && eleFooterHrefList.addEventListener('click', (e) => {
            let eleTarget: HTMLElement | null = e.target as HTMLElement;
            const maybeClassList = ['svg', 'path', 'SVG', 'PATH']
            try {
                while(eleTarget && (
                    !eleTarget.className
                    || (
                        maybeClassList.indexOf(eleTarget.tagName) >= 0
                        || eleTarget.className.indexOf('footer-column-title') < 0
                    )
                )) {
                    eleTarget = eleTarget.parentElement;
                }
                if (eleTarget && eleTarget.parentElement && eleTarget.parentElement.className.indexOf('footer-href-column') >= 0) {
                    eleTarget.parentElement.classList.toggle('active');
                }
            } catch (e) {
            }

        })
    })
}
initFooterWT()

export default initFooterWT
