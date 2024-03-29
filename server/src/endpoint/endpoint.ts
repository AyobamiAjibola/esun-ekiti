import { Express } from "express";
import authRoutes from "../routes/auth/auth.route";
import userRoutes from "../routes/user/user.route";
import councilRoutes from "../routes/council/council.route";
import eventRoutes from "../routes/event/event.route";
import newsRoutes from "../routes/news/news.route";
import projectRoutes from "../routes/project/project.route";
import historyRoutes from "../routes/history/history.route";
import commentRoutes from "../routes/comment/comment.route";
import settings from "../config/settings";

const routes = (app: Express) => {
  app.use(`${settings.service.apiRoot}/auth`, authRoutes);
  app.use(`${settings.service.apiRoot}/user`, userRoutes);
  app.use(`${settings.service.apiRoot}/council`, councilRoutes);
  app.use(`${settings.service.apiRoot}/event`, eventRoutes);
  app.use(`${settings.service.apiRoot}/news`, newsRoutes);
  app.use(`${settings.service.apiRoot}/project`, projectRoutes);
  app.use(`${settings.service.apiRoot}/history`, historyRoutes);
  app.use(`${settings.service.apiRoot}/comment`, commentRoutes);
};

export default routes;
