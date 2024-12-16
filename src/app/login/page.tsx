import { Suspense } from "react";
import LoginContainer from "@/containers/auth/login";

const LoginPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContainer />
    </Suspense>
  );
};

export default LoginPage;
