import AuthForm from "../components/auth/auth-form";
import { useEffect } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

function AuthPage() {
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (session?.user) {
        router.replace("/");
      }
    });
  }, []);
  return <AuthForm />;
}

export default AuthPage;
