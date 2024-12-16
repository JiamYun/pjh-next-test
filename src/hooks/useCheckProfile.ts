import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const useCheckProfile = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    const checkProfile = async () => {
      console.log("status", status);
      console.log("session", session);
      if (status === "authenticated" && session?.user?.profile) {
        const { profile } = session.user;
        console.log("profile", profile);
        const currentPath = window.location.pathname;

        if (
          currentPath.includes("/signup/phone") ||
          currentPath.includes("/signup/profilesetup")
        ) {
          return;
        }

        if (!profile.phone) {
          await router.replace("/signup/phone");
          return;
        }

        if (!profile.agreement) {
          await router.replace("/signup/profilesetup");
          return;
        }
      } else if (status === "authenticated" && !session?.user?.profile) {
        await router.replace("/signup/phone");
        return;
      }
    };

    checkProfile();
  }, [session, status, router]);
};

export default useCheckProfile;
