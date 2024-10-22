import { FastifyInstance } from "fastify";
import { searchQueryType } from "../routes/schemas";
import { User } from "./users";

const TABLE_NAME = "posts";

export interface Post {
  id: number;
  text: string;
  likes: number;
  hashtags?: string;
  user_id: number;
}
export interface PostDTO {
  id: number;
  text: string;
  likes: number;
  hashtags?: string;
  user: User;
}

interface PostQueryResult {
  id: number;
  text: string;
  likes: number;
  hashtags?: string;
  user_id: number;
  username: string;
  bio: string;
}

const formatPostDTO = (queryResult: PostQueryResult): PostDTO => {
  return {
    id: queryResult.id,
    text: queryResult.text,
    likes: queryResult.likes,
    hashtags: queryResult.hashtags,
    user: {
      id: queryResult.user_id,
      username: queryResult.username,
      bio: queryResult.bio,
    },
  };
};

export async function createPost(
  fastify: FastifyInstance,
  post: {
    text: string;
    hashtags?: string[];
    user_id: number;
  }
): Promise<Post> {
  return await fastify.tars.from(TABLE_NAME).insert({
    text: post.text,
    likes: 0,
    hashtags: post.hashtags,
    user_id: post.user_id,
  });
}

export async function getPosts(
  fastify: FastifyInstance,
  query: searchQueryType
): Promise<any> {
  const queryResult = fastify.tars
    .from(TABLE_NAME)
    .innerJoin("users", "users.id", "posts.user_id")
    .select();

  if (query.text) queryResult.whereLike("posts.text", `%${query.text}%`);
  if (query.tag) queryResult.whereLike("posts.hashtags", `%${query.tag}%`);

  return (await queryResult.then()).map(formatPostDTO);
}

export async function getPost(
  fastify: FastifyInstance,
  id: number
): Promise<Post | null> {
  const post = await fastify.tars.from(TABLE_NAME).where({ id }).select();

  if (!post) return null;
  return post[0];
}

export async function deletePost(
  fastify: FastifyInstance,
  id: number
): Promise<void> {
  await fastify.tars.from(TABLE_NAME).where({ id }).del();
}
