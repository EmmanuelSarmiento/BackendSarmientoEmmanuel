import express from "express";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import usersRouter from "./routes/users.router.js";
import viewsRouter from "./routes/views.routers.js";
import { __dirname } from "./utils.js";
import { engine } from "express-handlebars";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

//handlebars
app.engine("handlebars", engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

//Routes

app.use("/api/products", productsRouter);
app.use("api/carts", cartsRouter);
app.use("/api/users", usersRouter);
app.use("/", viewsRouter);

app.listen(8080, () => {
  console.log("Puerto en 8080 en funcionamiento");
});
