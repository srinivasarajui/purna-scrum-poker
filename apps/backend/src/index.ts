import { GameRouter } from "./game";
import { VotingSystemsRouter } from "./voting-system";
import actuator from "express-actuator";
import cors from "cors";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { createRouter } from "./common";
import express from "express";

const PORT = process.env.PORT || 3000;
const apiEndpoint = '/api';

const appRouter = createRouter()
  .merge('game.', GameRouter)
  .merge('votingSystems.', VotingSystemsRouter);

export type AppRouter = typeof appRouter;
const runApp = async () => {
  const app = express();
  app.use(actuator());
  app.use(apiEndpoint, createExpressMiddleware({router: appRouter}))
  app.use(cors);
  app.listen(PORT, () => { console.log(`listening at ${PORT} port`)})
}
runApp();