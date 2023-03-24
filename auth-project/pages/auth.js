import AuthForm from "../components/auth/auth-form";
import { useEffect } from "react";
import { getSession } from "next-auth/react";

function AuthPage() {
  useEffect(() => {
    getSession().then((session) => {
      console.log(session);
      if (session !== undefined) {
      }

      if (session?.user) {
        console.log("logged in");
      }
    });
  });
  return <AuthForm />;
}

export default AuthPage;
