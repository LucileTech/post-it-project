// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

//axios
const axios = require("axios");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// Telling hbs where the partials are located

hbs.registerPartials(__dirname + "/views/partials");

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

const capitalize = require("./utils/capitalize");
const projectName = "post-it-project";

app.locals.appTitle = `${capitalize(projectName)} created with IronLauncher`;

//Routes
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

//TODO ROUTE

const todoRoutes = require("./routes/todo.routes");
app.use("/", todoRoutes);

//NOTES ROUTE
const noteRoutes = require("./routes/note.routes");
app.use("/", noteRoutes);

//ALLFILES ROUTE

const filecreationRoutes = require("./routes/filecreation.routes");
app.use("/", filecreationRoutes);

// Errors
require("./error-handling")(app);

module.exports = app;
