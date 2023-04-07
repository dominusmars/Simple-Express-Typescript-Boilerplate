import { RequestHandler } from "express"


interface Page {
    name: string,
    path: string,
    description: string,
    disabled: boolean,
    action: RequestHandler
}

export default Page