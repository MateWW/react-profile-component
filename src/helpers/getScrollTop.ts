export function getScrollTop(): number {
    const html = document.documentElement;
    return Math.max(window.pageYOffset, html.scrollTop);
}
