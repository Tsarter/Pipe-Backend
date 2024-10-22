import knex, { Knex } from "knex";
import { PostBodyType } from "../schemas/schema";
const config: Knex.Config = {
  client: "mysql2",
  version: "8.0",
  connection: {
    host: "localhost",
    user: "root",
    password: "password",
    database: "posts",
    charset: "utf8",
  },
};
const knexInstance = knex(config);
const TABLE_NAME = "posts";
export interface Post {
  id: number;
  text: string;
  likes: number;
  hashtags?: string;
  user_id: number;
}
export async function createPost(post: PostBodyType): Promise<Post> {
  return await knexInstance.from(TABLE_NAME).insert({
    text: post.text,
    likes: 0,
    hashtags: post.hashtags,
    user_id: post.user_id,
  });
}
export async function getPosts(): Promise<Post[]> {
  const posts = await knexInstance.from(TABLE_NAME).select();
  return posts;
}
export async function getPost(id: number): Promise<Post> {
  const post = await knexInstance
    .from(TABLE_NAME)
    .where({ id })
    .select()
    .first();
  return post;
}
export async function deletePost(id: number): Promise<void> {
  await knexInstance.from(TABLE_NAME).where({ id }).del();
}
