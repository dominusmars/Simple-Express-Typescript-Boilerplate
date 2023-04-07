import { Express } from "express";
import fs from "fs"
import path from 'path'
import Page from "@models/Page";
import { log } from "@utils/logger";

const routePath = path.join(__dirname, "../pages")

async function applyPageRoutes(app: Express) {
    var routes = fs.readdirSync(routePath)
    const jsFiles = routes.filter((file) => {
        return path.extname(file) === '.js';
      });
    for (let i = 0; i < jsFiles.length; i++) {
        var route = jsFiles[i];
        if (route)
            try {
                var mod = await import(path.join(routePath, route))
                var r;
                if (mod.default) {
                    r = mod.default as Page
                } else {
                    r = mod as Page
                }
                if (r?.disabled) {
                    return;
                }
                if (r.path == 'api') {
                    throw new Error("unable to make page api")
                }
                if (r.path == 'routes') {
                    throw new Error("unable to make page routes")
                }


                app.get("/" + r.path, r.action)

                log("init page /" + r.path, "info")


            } catch (error: any) {
                log("unable to page route " + route, "error")
                console.log(error)

            }
    }

}






export default applyPageRoutes