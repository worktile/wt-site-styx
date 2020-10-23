class ModuleConfig {

    /** 端口号 */
    public readonly port = 1314;

    /** 数据库配置 */
    public readonly db = {
        host: "localhost",
        user: "root",
        password: "root",
        /** 数据库名 */
        database: "node_ts", // 待会创建数据库的时候就是这个名字
        /** 链接上限次数 */
        connection_limit: 10
    }

    /** 接口前缀 */
    public readonly api_prefix = "/api/v1/";
}

/** 项目配置 */
const config = new ModuleConfig();

export default config;
