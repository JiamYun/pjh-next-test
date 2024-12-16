import { Body3, Frame } from "@/atoms";
import { FrameScreen } from "@/atoms/Frame";
import Image from "@/atoms/Image";
import Button from "@/components/common/Button";

interface Country {
  value: string;
  label: string;
  emoji: string;
}

interface PhoneVerificationFormProps {
  phone: string;
  verificationCode: string;
  isVerificationSent: boolean;
  counter: number;
  verified: boolean;
  phoneError?: string;
  codeError?: string;
  countries: Country[];
  selectedCountry: string;
  isDropdownOpen: boolean;
  onDropdownToggle: () => void;
  onCountrySelect: (value: string) => void;
  onPhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCodeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSendVerification: () => void;
  onVerifyCode: () => void;
  onSubmit: () => void;
}

const PhoneVerificationForm = ({
  phone,
  verificationCode,
  isVerificationSent,
  counter,
  verified,
  phoneError,
  codeError,
  countries,
  selectedCountry,
  isDropdownOpen,
  onDropdownToggle,
  onCountrySelect,
  onPhoneChange,
  onCodeChange,
  onSendVerification,
  onVerifyCode,
  onSubmit,
}: PhoneVerificationFormProps) => {
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
            <Frame row w="100%" gap={20}>
              <Frame w="40%">
                <Frame col>
                  <button
                    onClick={onDropdownToggle}
                    disabled={isVerificationSent}
                    className="w-full border p-3 border-gray-300 rounded  justify-between items-center"
                  >
                    <span>
                      {countries.find((c) => c.value === selectedCountry)
                        ?.label || "국가 선택"}
                    </span>
                    <span className="ml-2">
                      {
                        countries.find((c) => c.value === selectedCountry)
                          ?.emoji
                      }
                    </span>
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute w-full mt-1 bg-white border border-gray-300 rounded shadow-lg z-10">
                      {countries.map((country) => (
                        <div
                          key={country.value}
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => onCountrySelect(country.value)}
                        >
                          {country.label}
                          <span className="ml-2">{country.emoji}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </Frame>
              </Frame>
              <Frame flex={1}>
                <Frame col>
                  <input
                    type="tel"
                    value={phone}
                    onChange={onPhoneChange}
                    placeholder="휴대폰 번호"
                    disabled={isVerificationSent}
                    className=" p-3 border border-gray-300 rounded"
                  />
                </Frame>
              </Frame>
            </Frame>
            {phoneError && <Body3 fontColor="red">{phoneError}</Body3>}

            <Button
              w="100%"
              onClick={onSendVerification}
              disabled={isVerificationSent && counter > 0}
              bg="#11227B"
              radius={4}
              py={12}
            >
              <Body3 fontColor="white">
                {isVerificationSent ? `재전송 (${counter}초)` : "인증번호 발송"}
              </Body3>
            </Button>

            {isVerificationSent && (
              <Frame col gap={4}>
                <input
                  type="number"
                  value={verificationCode}
                  onChange={onCodeChange}
                  placeholder="인증번호"
                  className="w-full p-3 border border-gray-300 rounded"
                />
                {codeError && <Body3 fontColor="red">{codeError}</Body3>}

                <Button
                  w="100%"
                  onClick={onVerifyCode}
                  disabled={verificationCode.length < 6 || verified}
                  bg="#11227B"
                  radius={4}
                  py={12}
                >
                  <Body3 fontColor="white">인증번호 확인</Body3>
                </Button>
              </Frame>
            )}
          </Frame>

          <Button
            w="100%"
            onClick={onSubmit}
            disabled={!verified}
            bg="#11227B"
            radius={4}
            py={12}
          >
            <Body3 fontColor="white">인증완료</Body3>
          </Button>
        </Frame>
      </Frame>
    </FrameScreen>
  );
};

export default PhoneVerificationForm;
