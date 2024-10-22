import {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  RouteOptions,
} from "fastify";

import * as postsModel from "../models/posts";
import { PostBodySchema, PostBodyType } from "./schemas";

export default function getIndex(fastify: FastifyInstance): RouteOptions {
  return {
    method: "POST",
    url: "/posts",
    schema: {
      body: PostBodySchema,
    },
    handler: async function (request: FastifyRequest, reply: FastifyReply) {
      const newPost = request.body as PostBodyType;
      const post = await postsModel.createPost(fastify, newPost);
      reply.code(201).send(post);
    },
  };
}
