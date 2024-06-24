import fastify from "fastify";
import { createBook } from "./routes/create-book";
import { getBooks } from "./routes/get-books";
import { updateBook } from "./routes/update-book";
import { deleteBook } from "./routes/delete-book";

const app = fastify();

app.register(createBook);
app.register(getBooks);
app.register(updateBook);
app.register(deleteBook);

app.listen({ port: 8080 }).then(() => {
  console.log("Server is running");
});
