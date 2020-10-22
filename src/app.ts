import * as Koa from 'koa'
import * as path from 'path'
import * as Router from 'koa-router'

import './modules/api/apiRoutes'; // 路由入口
import './modules/api/apiHeader';

import bodyParser = require("koa-bodyparser");

const app: Koa = new Koa()

const env = process.env.NODE_ENV || 'development'
const isDev = env === 'development'

// render
require('koa-ejs')(app, {
    // @ts-ignore
    // root 为经过webpack编译后的真实模板路径
    root: path.resolve(__dirname, isDev ? '../dist/views' : '../client/views'),
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
            title: '首页'
        })
    })
    .get('/blog', async (ctx: Koa.Context) => {
        await ctx.render('blog', {
            title: '博客'
        })
    })

// 使用中间件后，可以用ctx.request.body进行获取POST请求参数，中间件自动给我们解析为json
app.use(bodyParser());

// request.method可以获取请求方法。get，post或者其他类型(request对象被封在ctx内，所以也可以ctx.method获取)

app.use(async (ctx: Koa.Context, next: Koa.Next) => {
    ctx.set({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
        // "Content-Type": "application/json",
        // "Access-Control-Allow-Credentials": "true",
        // "Access-Control-Allow-Methods": "OPTIONS, GET, PUT, POST, DELETE",
        // "X-Powered-By": "3.2.1",
        // "Content-Security-Policy": `script-src "self"` // 只允许页面`script`引入自身域名的地址
    });

    // 如果前端设置了 XHR.setRequestHeader('Content-Type', 'application/json')
    // ctx.set 就必须携带 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept Authorization'
    // 如果前端设置了 XHR.setRequestHeader('Authorization', 'xxxx') 同样的就是上面 Authorization 字段
    // 并且这里要转换一下状态码
    if (ctx.request.method === 'OPTIONS') {
        ctx.response.status = 200;
    }

    try {
        await next();
    } catch (err) {
        ctx.response.status = err.statusCode || err.status || 500;
        ctx.response.body = {
            message: err.message
        }
    }
});

app
    .use(router.routes())
    .use(router.allowedMethods());

module.exports = app
export default app
