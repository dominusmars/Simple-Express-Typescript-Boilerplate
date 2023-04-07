import { Express } from "express";
import fs from "fs"
import path from 'path'
import Route from "@models/Route";
import { log } from "@utils/logger";

const routePath = path.join(__dirname, "../api")

async function applyRoutes(app: Express) {
    var routes = fs.readdirSync(routePath)
    const jsFiles = routes.filter((file) => {
        return path.extname(file) === '.js';
      });
    for (let i = 0; i < jsFiles.length; i++) {
        var route = jsFiles[i];
        try {
            var mod = await import(path.join(routePath, route))
            var r;
            if (mod.default) {
                r = mod.default as Route
            } else {
                r = mod as Route
            }
            if (r?.disabled) {
                return;
            }

            switch (r.method) {
                case "connect":
                    app.connect("/api/" + r.path, r.action)
                    break;
                case 'del':
                    app.delete("/api/" + r.path, r.action)

                    break;
                case 'get':
                    app.get("/api/" + r.path, r.action)
                    break;
                case 'options':
                    app.options("/api/" + r.path, r.action)

                    break;
                case 'patch':
                    app.patch("/api/" + r.path, r.action)

                    break;
                case 'post':
                    app.post("/api/" + r.path, r.action)

                    break;
                case 'put':
                    app.put("/api/" + r.path, r.action)

                    break;
                case 'trace':
                    app.trace("/api/" + r.path, r.action)
                    break;
                default:
                    app.use("/api/" + r.path, r.action)
                    break;
            }
            log("init route /api/" + r.path, "info")


        } catch (error: any) {
            log("unable to init route " + route, "error")
            console.log(error)

        }
    }



}






export default applyRoutes