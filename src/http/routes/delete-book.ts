import { FastifyInstance } from "fastify";
import { z } from "zod";
import prisma from "../lib/prisma";

export async function deleteBook(app: FastifyInstance) {
  app.delete("/books/:id", async (request, reply) => {
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
      return reply.status(404).send("Book not found");
    }

    await prisma.book.delete({
      where: {
        id,
      },
    });
    return reply.status(204).send();
  });
}
