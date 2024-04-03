// nextauth.d.ts
import { DefaultUser } from 'next-auth';

interface IUser extends DefaultUser {
  token: {
    token: string;
  };
  username: string;
  roles: number[];
}
declare module 'next-auth' {
  type User = IUser;

  interface Session {
    user?: User;
  }
}
