import express from "express";
import { engine } from 'express-handlebars';
import mongoose from "mongoose";

import prodsRouter from './src/routes/products.route.js';
import cartsRouter from './src/routes/carts.route.js';

const app = express();

// View engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

// Public folder
app.use(express.static('public'));

// Middlewares request
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Router productos
app.use("/products", prodsRouter);
// Router Carritos
app.use("/carts", cartsRouter);

// Home del sitio
app.get("/", (req, res) => {
    res.redirect("/home");
});

app.get("/home", (req, res) => {
    res.render("home");
});

app.get("/ping", (req, res) => {
    res.send("Pong!");
});

// Pagina error 404
app.use((req, res) => {
    res.render("404");
});

// Conexión MongoDB Atlas
mongoose.connect(`mongodb+srv://${process.env.DB_USR}:${process.env.DB_KEY}@cluster0.mdctdte.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`);

app.listen(3000, () => {
    console.log("App listening on port 3000");
});