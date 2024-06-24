import { FastifyInstance } from "fastify";
import { z } from "zod";
import prisma from "../lib/prisma";

export async function updateBook(app: FastifyInstance) {
  app.patch("/books/:id", async (request, reply) => {
    const getBookParamsValidate = z.object({
      id: z.string().uuid(),
    });

    const getBookBodyValidate = z.object({
      isFavorite: z.optional(z.boolean()),
      isReading: z.optional(z.boolean()),
      isFinished: z.optional(z.boolean()),
    });

    const { id } = getBookParamsValidate.parse(request.params);
    const { isFavorite, isReading, isFinished } = getBookBodyValidate.parse(
      request.body
    );

    const book = await prisma.book.findUnique({
      where: {
        id,
      },
    });

    if (!book) {
      return reply.code(404).send("Book not found");
    }

    await prisma.book.update({
      where: {
        id,
      },
      data: {
        isFavorite,
        isReading,
        isFinished,
      },
    });

    return reply.code(200).send("Book updated successfully");
  });
}
