"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PhoneVerificationForm from "@/components/auth/phone";
import { useDispatch } from "react-redux";
import signupSlice from "@/store/slices/singupSlice";

const countries = [
  { value: "+82", label: "대한민국", emoji: "🇰🇷" },
  { value: "+81", label: "일본", emoji: "🇯🇵" },
  { value: "+65", label: "싱가포르", emoji: "🇸🇬" },
];

const PhoneVerificationContainer = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [selectedCountry, setSelectedCountry] = useState("+82");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [actualCode, setActualCode] = useState("");
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [counter, setCounter] = useState(0);
  const [verified, setVerified] = useState(false);
  const [errors, setErrors] = useState({
    phone: "",
    code: "",
  });

  useEffect(() => {
    if (counter > 0) {
      const timer = setTimeout(() => setCounter(counter - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsVerificationSent(false);
    }
  }, [counter]);

  const handleSendVerification = async () => {
    try {
      const response = await fetch("/api/verify?type=check-phone", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: `${selectedCountry}${phone.replace(/^0+/, "")}`,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setActualCode(data.code);
        setIsVerificationSent(true);
        setCounter(180); // 3분
        setErrors({ ...errors, phone: "" });
      } else {
        setErrors({ ...errors, phone: data.message });
      }
    } catch (error) {
      console.error("인증번호 발송 실패:", error);
      setErrors({ ...errors, phone: "인증번호 발송에 실패했습니다" });
    }
  };

  const handleVerifyCode = async () => {
    try {
      const body = {
        phone: `${selectedCountry}${phone.replace(/^0+/, "")}`,
        inputCode: verificationCode,
        actualCode: actualCode,
      };

      const response = await fetch("/api/verify?type=verify-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      console.log("verify-code response:", data);

      if (response.ok && data.phone) {
        setVerified(true);
        setErrors({ ...errors, code: "" });
      } else {
        setErrors({ ...errors, code: "인증번호를 확인해주세요" });
      }
    } catch (error) {
      console.error("인증번호 확인 실패:", error);
      setErrors({ ...errors, code: "인증 처리 중 오류가 발생했습니다" });
    }
  };

  const handleSubmit = () => {
    if (verified) {
      dispatch(
        signupSlice.actions.setPhone(
          `${selectedCountry}${phone.replace(/^0+/, "")}`
        )
      );
      // 모든 상태 초기화
      setSelectedCountry("+82");
      setIsDropdownOpen(false);
      setPhone("");
      setVerificationCode("");
      setActualCode("");
      setIsVerificationSent(false);
      setCounter(0);
      setVerified(false);
      setErrors({
        phone: "",
        code: "",
      });

      // 다음 단계(프로필 설정)로 이동
      router.push("/signup/profilesetup");
    }
  };

  return (
    <PhoneVerificationForm
      phone={phone}
      verificationCode={verificationCode}
      isVerificationSent={isVerificationSent}
      counter={counter}
      verified={verified}
      phoneError={errors.phone}
      codeError={errors.code}
      countries={countries}
      selectedCountry={selectedCountry}
      isDropdownOpen={isDropdownOpen}
      onDropdownToggle={() => setIsDropdownOpen(!isDropdownOpen)}
      onCountrySelect={(value) => {
        setSelectedCountry(value);
        setIsDropdownOpen(false);
      }}
      onPhoneChange={(e) => setPhone(e.target.value)}
      onCodeChange={(e) => setVerificationCode(e.target.value)}
      onSendVerification={handleSendVerification}
      onVerifyCode={handleVerifyCode}
      onSubmit={handleSubmit}
    />
  );
};

export default PhoneVerificationContainer;
