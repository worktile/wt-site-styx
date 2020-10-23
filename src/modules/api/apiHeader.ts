import * as Koa from "koa";
import router from "../router";
import {
    ResultFail,
    ResultSuccess
} from "../interfaces";

// 获取用户信息
router.get("/getHeaderInfo", async (ctx: Koa.ParameterizedContext) => {
    // /** 接收参数 */
    // const params = ctx.request.body;
    /** 返回结果 */
    const bodyResult: ResultFail | ResultSuccess = {
        message: "该账号不存在，可能已经从数据库中删除",
        code: 500,
    };

    ctx.body = bodyResult;
})
