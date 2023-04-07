import Route from "@models/Route";

var route: Route = {
    name: "Hello world",
    path: "hello",
    description: "Repies with Hello World",
    method: "get",
    disabled: false,
    action: (req, res) => {
        res.send('Hello World!')
    }
}



export default route