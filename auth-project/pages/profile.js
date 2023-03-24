import UserProfile from "../components/profile/user-profile";
import { useSession, signOut, getSession } from "next-auth/react";

function ProfilePage() {
  return <UserProfile />;
}

export async function getServerSideProps(context) {
  const data = await getSession({ req: context.req });

  if (data === undefined) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {
      data,
    },
  };
}
export default ProfilePage;
