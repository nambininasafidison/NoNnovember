import express, { Application, NextFunction, Request, Response } from "express";
import http from "http";
import { CustomErrorInterface } from "./Interfaces/CustomErrorInterface";
import sequelize from "./db/sequelize";
import authRoutes from "./routes/auth.route";
import userRoutes from "./routes/user.route";

class Server {
  private app: Application;
  private server: http.Server<
    typeof http.IncomingMessage,
    typeof http.ServerResponse
  >;

  constructor() {
    this.app = express();
    this.useMiddlewares(this.app);
    this.useRoutes(this.app);
    this.server = http.createServer(this.app);
  }

  useMiddlewares(app: Application) {
    app.use(express.json());
    app.use(
      (
        error: CustomErrorInterface,
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        const statusCode = error.statusCode || 500;
        const message = error.message || "Internal server error";
        return res.status(statusCode).json({
          success: false,
          error: message,
          statusCode: statusCode,
        });
      }
    );
  }

  useRoutes(app: Application) {
    app.use("/api/user", userRoutes);
    app.use("/api/auth", authRoutes);
  }

  async start(port: number) {
    try {
      await sequelize.authenticate();
      console.log("Database connected");
      await sequelize.sync();
      console.log("Database synchronized");
      this.server.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }
}

export default Server;
