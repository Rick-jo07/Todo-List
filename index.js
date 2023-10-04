import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 1337;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));



const TodoList = [];
const workList = [];


app.get("/", (req,res) => {
    const now = new Date();
    const stringify = {
        weekday : 'long',
        month   : 'long',
        day     : 'numeric', 
    };
    const hari = now.toLocaleDateString("en-US", stringify)
    res.render("index.ejs", {title: hari,
                             listItems : TodoList});
});

app.post("/", (req,res) => {
    let Data = req.body["task"];
    if(Data === ""){
        console.log("kosong");
    } else if(req.body.list === "Work") {
        workList.push(Data);
        res.redirect("/work");
    } else {
        TodoList.push(Data);
        res.redirect("/")
    }
})

app.get("/work", (req,res) => {
    res.render("index.ejs", {title: "Work List",
                             listItems : workList});
})
app.post("/work", (req,res) => {
    let Data = req.body["task"];
    workList.push(Data);
    res.redirect("/work")   
})
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})