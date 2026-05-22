import type { IUser } from "../models/user";
import type { ExpressMiddleware } from "./index";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }

  namespace session {
    interface SessionData {
      userId: string;
    }
  }
}

declare const authenticateUser: ExpressMiddleware;
