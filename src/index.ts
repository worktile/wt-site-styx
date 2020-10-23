const webpack = require('webpack')

// 引入项目 koa 主模块
const app = require('./app')

// webpack-dev-middleware中间件
import devMiddleware from './middleware/webpack-dev-middleware'

// webpack 配置文件
const webpackConfig = require('../config/webpack.dev.js')

// https://webpack.docschina.org/api/compiler
const compiler = webpack(webpackConfig)

app.use(devMiddleware(compiler, {
    publicPath: '/' // 很重要，提供了静态资源的路径
}))

app.on("error", (err: any, ctx: any) => {
    console.error("server error !!!!!!!!!!!!!", err, ctx);
})

const PORT: number = Number(process.env.PORT) || 3210

app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${ PORT }`);
})

export default app


// 参考项目配置连接: https://juejin.im/post/5ce25993f265da1baa1e464f
// mysql learn: https://www.jianshu.com/p/d54e055db5e0
