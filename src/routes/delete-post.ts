import {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  RouteOptions,
} from "fastify";

import * as postsModel from "../models/posts";

export default function getIndex(fastify: FastifyInstance): RouteOptions {
  return {
    method: "DELETE",
    url: "/posts/:id",
    handler: async function (request: FastifyRequest, reply: FastifyReply) {
      const { id } = request.params as { id: number };
      await postsModel.deletePost(fastify, id);
      reply.code(200).send("Deleted!");
    },
  };
}
