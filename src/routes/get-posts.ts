import {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  RouteOptions,
} from "fastify";

import * as postsModel from "../models/posts";
import { searchQuerySchema, searchQueryType } from "./schemas";

export default function getIndex(fastify: FastifyInstance): RouteOptions {
  return {
    method: "GET",
    url: "/posts",
    schema: {
      querystring: searchQuerySchema,
    },
    handler: async function (request: FastifyRequest, reply: FastifyReply) {
      const query = request.query as searchQueryType;
      const posts = await postsModel.getPosts(fastify, query);
      reply.send(posts);
    },
  };
}
