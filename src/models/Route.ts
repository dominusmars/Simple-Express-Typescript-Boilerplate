import { RequestHandler } from "express"


interface Route {
    name: string,
    path: string,
    description: string,
    method: "get" | "post" | "del" | "patch" | "put" | "connect" | "trace" | "options",
    disabled: boolean,
    action: RequestHandler
}

export default Route