import './styles/header.scss';

const initHeaderWT = () => {
    window && window.addEventListener('DOMContentLoaded', function () {
        const eleHeaderSection = document.querySelector('.header-section');
        let firstEnterNavMenu = true;
        if (eleHeaderSection) {
            eleHeaderSection.addEventListener('click', (e) => {
                const maybeEleClass = ['header-nav-close', 'header-nav-close-img', 'header-nav-menu-img'];
                if (maybeEleClass.indexOf((e.target as HTMLElement).className) >= 0) {
                    if (firstEnterNavMenu) {
                        firstEnterNavMenu = false;
                        const firstHeaderNavItem = document.querySelector('.header-section .header-nav-list > .header-nav-item:first-child');
                        firstHeaderNavItem && firstHeaderNavItem.classList.add('active');
                    }

                    if (eleHeaderSection.classList.contains('open-mobile-header')) {
                        document.documentElement.style.overflow = 'auto';
                        document.body.style.overflow = 'auto';
                    } else {
                        document.documentElement.style.overflow = 'hidden';
                        document.body.style.overflow = 'hidden';
                    }

                    eleHeaderSection.classList.toggle('open-mobile-header');
                    if (e.stopPropagation) {
                        e.stopPropagation();
                    }
                }

                let eleTarget: HTMLElement | null = e.target as HTMLElement;
                const maybeClickClass = ['svg', 'path', 'SVG', 'PATH'];
                try {
                    while(
                        eleTarget
                        && (
                            !eleTarget.className
                            || (maybeClickClass.indexOf(eleTarget.tagName) >= 0
                            || !eleTarget.classList.contains('nav-title-icon')))
                        ) {
                        eleTarget = eleTarget.parentElement;
                    }
                    if (eleTarget && eleTarget.parentElement && eleTarget.parentElement.classList.contains('header-nav-item')) {
                        eleTarget.parentElement.classList.toggle('active');
                    }
                } catch (e) {
                }
            })
        }

        let hasDrainage = true;

        document.addEventListener('scroll', (e) => {
            const headerELe = document.querySelector('.header-section');
            const activeClass = hasDrainage ? 'open-drainage' : 'touch-top';
            if (headerELe) {
                const nowIsTop = headerELe.getBoundingClientRect().top === 0;
                if (nowIsTop) {
                    headerELe.classList.add(activeClass);
                } else {
                    headerELe.classList.remove(activeClass);
                }
            }
        })

        const eleDrainageClose = document.querySelector('.drainage-close');
        eleDrainageClose && eleDrainageClose.addEventListener('click', (e) => {
            hasDrainage = false;

            const headerELe = document.querySelector('.header-section');
            headerELe && headerELe.classList.replace('open-drainage', 'touch-top');
        })
    })
}
initHeaderWT()

export default initHeaderWT
