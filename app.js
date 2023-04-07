const express = require("express");
const exhbs = require("express-handlebars");
const bodyParser = require("body-parser");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// import static files
app.use(express.static("public"));

// template engine
const handlebars = exhbs.create({ extname: ".hbs" });
app.engine("hbs", handlebars.engine);
app.set("view engine", "hbs");

const routes = require("./server/routes/students");
app.use("/", routes);

// listen port
app.listen(port, () => {
  console.log("listening port : " + port);
});
