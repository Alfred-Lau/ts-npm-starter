/// <reference path="../types.d.ts" />
import http from "http";
import ecstatic from "ecstatic";

export interface IHttpServerOptions {
    /** 静态文件目录，默认是当前目录 */
    root?: string;
    /** 缓存时间 */
    cache?: number;
}

/** 对外暴露的方法 */
export interface IHttpServer {
    /** 启动服务 */
    listen(port: number): void;
    /** 关闭服务 */
    close(): void;
}

export default class HttpServer implements IHttpServer {
    private server: http.Server;
    constructor(options: IHttpServerOptions) {
        const root = options.root || process.cwd();
        this.server = http.createServer(
            ecstatic({
                root,
                cache: options.cache === undefined ? 3600 : options.cache,
                showDir: true,
                defaultExt: "html",
                gzip: true,
                contentType: "application/octet-stream",
            })
        );
    }

    public listen(port: number, callback?: () => void) {
        this.server.listen(port);
        if (callback) callback();
    }

    public close() {
        this.server.close();
    }
}
