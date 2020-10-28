import * as Koa from 'koa'
import * as WebpackDevMiddleware from 'webpack-dev-middleware'
import { NextHandleFunction, NextFunction } from 'connect'
import { ServerResponse } from "http";

import webpack = require('webpack')

const devMiddleware = (compiler: webpack.ICompiler, opts: WebpackDevMiddleware.Options) => {
  const middleware = WebpackDevMiddleware(compiler, opts)
  return async (ctx: Koa.Context, next: NextHandleFunction) => {
    await middleware(ctx.req, {
      end: (content: any) => {
        ctx.body = content
      },
      setHeader: (name, value) => {
        ctx.set(name, value as string | string[])
      }
    }as ServerResponse, next as NextFunction)
  }
}

export default devMiddleware
