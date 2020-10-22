/** 成功返回提示数据 */
export interface ResultSuccess {
    /** 状态提示 */
    message: string
    /** 状态成功码 */
    code: 200
    /** 成功返回数据 */
    result: any
}

/** 失败返回提示数据 */
export interface ResultFail {
    /** 状态错误提示 */
    message: string
    /** 状态错误码 */
    code: number
}

interface MysqlErrorInfoType {
    code: string | number
    errno: number
    sqlMessage: string
    sqlState: string
    index: number
    sql: string
}

/** mysql错误数据类型 */
export interface MysqlErrorType {
    /** 错误信息 */
    info: MysqlErrorInfoType
    /** 信息描述 */
    message: string
}

/** JavaScript类型 */
export type JavaScriptTypes = "string" | "number" | "array" | "object" | "function" | "null" | "undefined";

/** 运算符号 */
export type NumberSymbols = "+" | "-"| "*" | "/";

