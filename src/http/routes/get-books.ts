import { FastifyInstance } from "fastify";
import { z } from "zod";
import prisma from "../lib/prisma";

export async function getBooks(app: FastifyInstance) {
  app.get("/books", async (request, reply) => {
    const books = await prisma.book.findMany();
    return reply.code(200).send({ data: books });
  });

  app.get("/books/:id", async (request, reply) => {
    const getBookParamsValidate = z.object({
      id: z.string().uuid(),
    });

    const { id } = getBookParamsValidate.parse(request.params);

    const book = await prisma.book.findUnique({
      where: {
        id,
      },
    });

    if (!book) {
      return reply.code(404).send("Book not found");
    }

    return reply.code(200).send({ data: book });
  });
}
