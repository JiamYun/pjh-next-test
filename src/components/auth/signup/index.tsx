import { Body3, Frame } from "@/atoms";
import { FrameScreen } from "@/atoms/Frame";
import Image from "@/atoms/Image";
import Button from "@/components/common/Button";

interface SignupFormProps {
  email: string;
  password: string;
  passwordConfirm: string;
  passwordError?: string;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordConfirmChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

interface SignupFormProps {
  email: string;
  password: string;
  passwordConfirm: string;
  passwordError?: string;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordConfirmChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

const SignupForm = ({
  email,
  password,
  passwordConfirm,
  passwordError,
  onEmailChange,
  onPasswordChange,
  onPasswordConfirmChange,
  onSubmit,
}: SignupFormProps) => {
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
            <Frame col w="100%" gap={4}>
              <input
                type="password"
                value={passwordConfirm}
                onChange={onPasswordConfirmChange}
                placeholder="비밀번호 확인"
                className="w-full p-3 border border-gray-300 rounded"
              />
              {passwordError && <Body3 fontColor="red">{passwordError}</Body3>}
            </Frame>
          </Frame>

          <Button w="100%" onClick={onSubmit} bg="#11227B" radius={4} py={12}>
            <Body3 fontColor="white">회원가입</Body3>
          </Button>
        </Frame>
      </Frame>
    </FrameScreen>
  );
};

export default SignupForm;
