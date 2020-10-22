import router from "../router";
import html from "../template";
import stateInfo from "../state";

// "/*" 监听全部
router.get("/", (ctx, next) => {
    // 指定返回类型
    ctx.response.type = "html";
    ctx.body = html;

    // 路由重定向
    // ctx.redirect("/home");

    // 302 重定向到其他网站
    // ctx.status = 302;
    // ctx.redirect("https://www.baidu.com");
})

router.get("/home", (ctx, next) => {
    ctx.response.type = "html";
    ctx.body = `<h1 style="text-align: center; line-height: 40px; font-size: 24px; color: #007fff">Welcome to home</h1>`;
})

// get 请求
router.get("/get", (ctx, next) => {
    /** 接收参数 */
    const params: object | string = ctx.query || ctx.querystring;

    console.log("/get", params);

    ctx.body = stateInfo.getSuccessData({
        method: "GET 请求成功",
        port: 1995,
        time: Date.now()
    });
})

// post 请求
router.post("/post", (ctx, next) => {
    /** 接收参数 */
    const params: object = ctx.request.body || ctx.params;

    console.log("/post", params);

    const result = {
        data: "POST 请求成功"
    }

    ctx.body = stateInfo.getSuccessData(result, "Post Request Example success");
})
