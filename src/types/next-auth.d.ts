import "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      profile?: any;
    };
  }

  interface User {
    accessToken?: string;
    refreshToken?: string;
    profile?: any;
  }

  interface SocialLoginData {
    authType: string;
    isNewAccount: boolean;
    socialLoginId?: string;
    accessToken?: string;
    name?: string;
  }
}
