import Page from "@models/Page";

var route: Page = {
    name: "Home",
    path: "",
    description: "Home Page",
    disabled: false,
    action: (req, res) => {
        var data = {
            'pageTitle': "Express BoilerPlate",
            "greeting": "Greetings from Express"
        }
        res.render('index', data)
    }
}



export default route