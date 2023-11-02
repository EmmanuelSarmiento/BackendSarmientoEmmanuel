import mongoose from "mongoose";

const URI =
  "mongodb+srv://sarmientoemmanuel:Emmanuel.1096@cluster0.puz2tcr.mongodb.net/db473157?retryWrites=true&w=majority";

mongoose
  .connect(URI)
  .then(() => console.log("conectado a la base de datos"))
  .catch((erro) => console.log(erro));
