import { Express, RequestHandler } from "express";
import fs from "fs"
import path from 'path'
import Route from "@models/Route";
import { log } from "@utils/logger";

const routePath = path.join(__dirname, "../api")

function makeDevJSONRoute(route: Route): RequestHandler {
    return (req, res) => {
        res.json({
            "name": route.name,
            "method": route.method.toUpperCase(),
            "description": route.description,
            "path": "/api/" + route.path,
            "disabled": route.disabled,
        })
    }
}




async function applyDevRoutes(app: Express) {
    if (!process.env.DEV) {
        return;
    }
    var routes = fs.readdirSync(routePath)
    const jsFiles = routes.filter((file) => {
        return path.extname(file) === '.js';
    });

    var jsonedRoutes = jsFiles.map(async (route) => {
        try {
            var mod = await import(path.join(routePath, route))
            var r;
            if (mod.default) {
                r = mod.default as Route
            } else {
                r = mod as Route
            }
            return {
                "name": r.name,
                "method": r.method.toUpperCase(),
                "description": r.description,
                "path": "/api/" + r.path,
                "disabled": r.disabled,
            }
        } catch (error: any) {
            log("unable to init route " + route, "error")
        }
    })
    var json = await Promise.all(jsonedRoutes);

    app.get("/routes", (req, res) => {
        res.json(json)
    })

}






export default applyDevRoutes