import express from "express";
import productsRouter from "./routes/products.router.js";
import usersRouter from "./routes/users.router.js";
import viewsRouter from "./routes/views.router.js";
import { __dirname } from "./utils.js";
import { engine } from "express-handlebars";
// import { Server } from "socket.io";
import "./db/configDB.js";

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
app.use("/api/users", usersRouter);
app.use("/", viewsRouter);

const httpServer = app.listen(8080, () => {
  console.log("Puerto en 8080 en funcionamiento");
});

// const socketServer = new Server(httpServer);
// socketServer.on("connection", (socket) => {
//   socket.on("disconnect", () => {});
//   socket.on("newPrice", (value) => {
//     socket.broadcast.emit("priceUpdated", value);
//   });
//   socket.on("newPrice2", (value) => {
//     socketServer.emit("priceUpdated2", value);
//   });
// });
