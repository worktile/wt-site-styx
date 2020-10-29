import * as Koa from 'koa'
import * as path from 'path'
import * as Router from 'koa-router'

const app: Koa = new Koa()
app.use(require('koa-static')(__dirname,'./static'));

const env = process.env.NODE_ENV || 'development'
const isDev = env === 'development'

// render
require('koa-ejs')(app, {
    // @ts-ignore
    // root 为经过webpack编译后的真实模板路径
    root: path.resolve(__dirname, isDev ? './public' : '../built'),
    layout: false,
    viewExt: 'html',
    cache: false,
    debug: false,
    // delimiter: '?',
})


// router
const router: Router = new Router()

router
    .get('/', async (ctx: Koa.Context) => {
        await ctx.render('index', {
            title: 'site-styx'
        })
    })

app
    .use(router.routes())
    .use(router.allowedMethods());

module.exports = app
export default app
