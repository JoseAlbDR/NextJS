// nextauth.d.ts
import { DefaultSession, DefaultUser } from 'next-auth';

interface IUser extends DefaultUser {
  /**
   * Roles del usuario
   */
  roles?: string[];
  /**
   * Agregar cualquier otro campo que tu manejas
   */
}

declare module 'next-auth' {
  interface User extends IUser {}

  interface Session {
    user?: User;
  }
}

declare module '@auth/core/jwt' {
  interface JWT extends IUser {
    id: string;
  }
}
