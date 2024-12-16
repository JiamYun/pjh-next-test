import { Checkbox } from "@/components/common/Checkbox";

import Button from "@/components/common/Button";
import { Body2, Frame } from "@/atoms";
import { Input } from "@nextui-org/react";

import termsData from "@/constants/terms.json";
import privacyData from "@/constants/privacy.json";
import marketingData from "@/constants/marketing.json";

interface ProfileSetupFormProps {
  inputs: {
    username: string;
    name: string;
    agreement: boolean;
    privacy: boolean;
    marketing: boolean;
  };
  errors: {
    usernameError: string;
    nameError: string;
    agreementError: string;
    privacyError: string;
    serverError: string;
  };
  onInputChange: (name: string, value: string) => void;
  onAgreementChange: (type: string) => void;
  onSubmit: () => void;
}

const ProfileSetupForm = ({
  inputs,
  errors,
  onInputChange,
  onAgreementChange,
  onSubmit,
}: ProfileSetupFormProps) => {
  return (
    <Frame>
      <Body2>회원정보 입력</Body2>

      <input
        // label="닉네임"
        value={inputs.username}
        // error={errors.usernameError}
        onChange={(e) => onInputChange("username", e.target.value)}
        placeholder="닉네임을 입력해주세요"
      />

      <input
        // label="이름"
        value={inputs.name}
        // error={errors.nameError}
        onChange={(e) => onInputChange("name", e.target.value)}
        placeholder="이름을 입력해주세요"
        className="mt-4"
      />

      {errors.serverError && (
        <Body2 fontColor="red" pt={8}>
          {errors.serverError}
        </Body2>
      )}

      <div className="mt-8 space-y-2">
        <Checkbox
          text="전체 동의"
          isChecked={inputs.agreement && inputs.privacy && inputs.marketing}
          onClick={() => onAgreementChange("all")}
          mt={32}
          mb={10}
        />

        <Checkbox
          text="(필수) 이용약관 동의"
          isChecked={inputs.agreement}
          onClick={() => onAgreementChange("agreement")}
          error={errors.agreementError}
          mt={10}
          ml={20}
          path="/policies/terms"
        />

        <Checkbox
          text="(필수) 개인정보 취급방침 동의"
          isChecked={inputs.privacy}
          onClick={() => onAgreementChange("privacy")}
          error={errors.privacyError}
          mt={10}
          ml={20}
          path="/policies/privacy"
        />

        <Checkbox
          text="(선택) 마케팅 정보 수신 동의"
          isChecked={inputs.marketing}
          onClick={() => onAgreementChange("marketing")}
          mt={10}
          ml={20}
          mb={30}
          path="/policies/marketing"
        />
      </div>

      <Button onClick={onSubmit}>가입완료</Button>
    </Frame>
  );
};

export default ProfileSetupForm;
