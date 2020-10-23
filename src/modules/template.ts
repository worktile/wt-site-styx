const style = `
<style>
*{ padding: 0; margin: 0; }
div { background: #a6b1b5; margin-bottom: 10px; color: #fff; padding: 4px 8px; font-size: 18px; }
</style>
`
const content = `
    <div><a href="/home">go to home<a></div>
`
/** 页面内容 */
const html = (style + content).replace(/\n/g, '');

export default html;
