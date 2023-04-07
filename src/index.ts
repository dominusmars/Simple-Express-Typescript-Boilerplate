import express from 'express'
import dotenv from 'dotenv'
import applyRoutes from '@utils/loadApi';
import applyDevRoutes from 'dev/devRoutes';
import applyPageRoutes from '@utils/loadPages';
import logger from "morgan"
import helmet from 'helmet'
import path from 'path'


const PORT = process.env.PORT ? process.env.PORT : 3000
dotenv.config()



var app = express();
// Set the view engine to Pug
app.set('view engine', 'pug');

// Set the directory for your views
app.set('views', path.join(__dirname, "views"));
app.use(helmet.frameguard());

app.use(logger("dev"))

app.disable("x-powered-by");


var promises = [
    applyRoutes(app),
    applyDevRoutes(app),
    applyPageRoutes(app)
]

Promise.all(promises).then(() => {
    app.use(express.static(path.join(__dirname, "public")))

    app.use((req, res, next) => {
        res.status(404).send('Sorry, page not found.');
    });



    app.use((err: { message: any; status: any; }, req: any, res: { locals: { message: any; error: any; }; status: (arg0: any) => void; render: (arg0: string) => void; }, next: any) => {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = process.env.DEV ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render("error");
    });


    app.listen(PORT, () => {
        console.log(`Server listening at http://localhost:${PORT}`);
    })


})


