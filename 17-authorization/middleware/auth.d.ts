import type { IUser } from "../models/user";
import type { ExpressMiddleware } from "./index";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
    interface Locals {
      isAuthenticated: boolean;
      csrfToken: string;
    }
  }

  namespace session {
    interface SessionData {
      userId: string;
    }
  }
}

declare const authenticateUser: ExpressMiddleware;
declare const populateLocals: ExpressMiddleware;
declare const isAuthenticated: ExpressMiddleware;
