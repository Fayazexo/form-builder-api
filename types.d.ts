import { User } from 'src/rest/user/schemas/user.schema';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
