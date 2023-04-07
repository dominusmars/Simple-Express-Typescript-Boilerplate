import { RequestHandler, Router } from "express"


interface Rounting {
    name: string,
    path: string,
    description: string,
    disabled: boolean,
    action: Router
}

export default Rounting