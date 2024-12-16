import NextAuth from "next-auth";
import { authOptions } from "./options"; // authOptions를 별도 파일로 분리하는 것을 추천

// GET과 POST 핸들러를 명시적으로 export
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
