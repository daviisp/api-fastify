import { FastifyInstance } from "fastify";
import { z } from "zod";
import prisma from "../lib/prisma";

export async function createBook(app: FastifyInstance) {
  app.post("/books", async (request, reply) => {
    const createBookValidate = z.object({
      title: z.string(),
      author: z.string(),
      description: z.string(),
    });

    const { title, author, description } = createBookValidate.parse(
      request.body
    );

    const book = await prisma.book.create({
      data: {
        title,
        author,
        description,
      },
    });

    return reply.code(201).send({ data: book });
  });
}
