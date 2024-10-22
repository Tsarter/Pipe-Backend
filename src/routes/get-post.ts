import {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  RouteOptions,
} from "fastify";

import * as postsModel from "../models/posts";

export default function getIndex(fastify: FastifyInstance): RouteOptions {
  return {
    method: "GET",
    url: "/posts/:id",
    handler: async function (request: FastifyRequest, reply: FastifyReply) {
      const { id } = request.params as { id: number };
      const post = await postsModel.getPost(fastify, id);
      reply.send(post);
    },
  };
}
