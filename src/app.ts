import Fastify, { FastifyInstance } from "fastify";
import knexPlugin from "./plugins/knex-plugin";
import routes from "./routes/index";

const fastify: FastifyInstance = Fastify();

fastify.register(knexPlugin);
fastify.register(routes);

async function main() {
  try {
    await fastify.listen({ port: 3000, host: "0.0.0.0" });
    console.log("server is running ✅");
  } catch (e) {
    console.log("error 🫡");
    console.log((e as Error).message);
  }
}

main();
