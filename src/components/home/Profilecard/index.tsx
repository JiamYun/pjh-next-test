import { Body3, Body6, Frame } from "@/atoms";
import { useSession } from "next-auth/react";
interface ProfileCardProps {
  onClick: () => void;
}

const ProfileCard = ({ onClick }: ProfileCardProps) => {
  const { data: session, status } = useSession();
  const userProfile = session?.user?.profile;

  return (
    <Frame w="100%" px={20} row onClick={onClick}>
      <Frame w="100%" py={12} row>
        <Frame w="50%" py={12} col>
          {status === "authenticated" && userProfile ? (
            <>
              <Body6>안녕하세요</Body6>
              <Body3>{userProfile.username}님</Body3>
            </>
          ) : (
            <>
              <Body6>안녕하세요</Body6>
              <Body3>로그인해주세요</Body3>
            </>
          )}
        </Frame>
        <Frame w="50%" col alignment="right">
          <Body3 py={20}>
            {status === "authenticated" ? "로그아웃" : "로그인 및 회원가입"}
          </Body3>
        </Frame>
      </Frame>
    </Frame>
  );
};

export default ProfileCard;
