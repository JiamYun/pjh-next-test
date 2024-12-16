import { Body3, Frame } from "@/atoms";
import { FrameScreen } from "@/atoms/Frame";
import Image from "@/atoms/Image";
import Button from "@/components/common/Button";
import { useRouter } from "next/navigation";

interface EmailLoginFormProps {
  email: string;
  password: string;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

const EmailLoginForm = ({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}: EmailLoginFormProps) => {
  const router = useRouter();

  return (
    <FrameScreen>
      <Frame col w="100%" h="100%" alignment="center" gap={40}>
        <Frame col w="100%" alignment="center" gap={12} pt={60}>
          <Image
            src="/images/main-logo.png"
            alt="로고"
            style={{
              width: "100%",
              height: "100%",
              aspectRatio: 1.6525 / 1,
            }}
          />
        </Frame>

        <Frame col w="100%" gap={20} px={20}>
          <Frame col w="100%" gap={12}>
            <input
              type="email"
              value={email}
              onChange={onEmailChange}
              placeholder="이메일"
              className="w-full p-3 border border-gray-300 rounded"
            />
            <input
              type="password"
              value={password}
              onChange={onPasswordChange}
              placeholder="비밀번호"
              className="w-full p-3 border border-gray-300 rounded"
            />
          </Frame>

          <Button w="100%" onClick={onSubmit} bg="#11227B" radius={4} py={12}>
            <Body3 fontColor="white">로그인</Body3>
          </Button>

          <Frame row w="100%" alignment="center">
            <Button
              onClick={() => {
                router.push("/signup");
              }}
              w="100%"
              fontColor="#666"
              radius={4}
              py={12}
              stroke={{ color: "#666", size: 1, perSide: ["all"] }}
            >
              <Body3>회원가입</Body3>
            </Button>
          </Frame>
        </Frame>
      </Frame>
    </FrameScreen>
  );
};

export default EmailLoginForm;
