"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSession, useSession } from "next-auth/react";
import axios from "axios";
import ProfileSetupForm from "@/components/auth/profilesetup";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/store";
import { useApi } from "@/hooks/useApi";
import signupSlice from "@/store/slices/singupSlice";

const ProfileSetupContainer = () => {
  const router = useRouter();
  const { data: session, update } = useSession();
  const { profile } = useApi();
  const dispatch = useAppDispatch();
  const signUpData = useSelector((state: RootState) => state.signup);
  const [inputs, setInputs] = useState({
    username: "",
    name: "",
    agreement: false,
    privacy: false,
    marketing: false,
  });

  const [errors, setErrors] = useState({
    usernameError: "",
    nameError: "",
    agreementError: "",
    privacyError: "",
    serverError: "",
  });

  useEffect(() => {
    if (errors.nameError !== "") {
      setErrors({
        ...errors,
        nameError: "",
      });
    }
  }, [inputs.name]);

  const handleAgreementChange = (type: string) => {
    if (type === "all") {
      const newValue = !(
        inputs.agreement &&
        inputs.privacy &&
        inputs.marketing
      );
      setInputs({
        ...inputs,
        agreement: newValue,
        privacy: newValue,
        marketing: newValue,
      });
    } else {
      setInputs((prev) => ({
        ...prev,
        [type]: !prev[type as keyof typeof inputs],
      }));

      if (type === "agreement" || type === "privacy") {
        setErrors((prev) => ({
          ...prev,
          [`${type}Error`]: "",
        }));
      }
    }
  };

  const handleSubmit = async () => {
    try {
      const errorMsgs = {
        usernameError: "",
        nameError: "",
        agreementError: "",
        privacyError: "",
        serverError: "",
      };

      //   if (!validateUserName(inputs.username)) {
      //     errorMsgs.usernameError =
      //       "다른 닉네임을 입력해주세요. (15글자 미만. 운영자/관리자/admin 금지어)";
      //   }

      if (inputs.name === "" || inputs.name.trim() === "") {
        errorMsgs.nameError = "이름을 입력해주세요.";
      }

      if (!inputs.agreement) {
        errorMsgs.agreementError = "이용약관에 동의해주세요.";
      }

      if (!inputs.privacy) {
        errorMsgs.privacyError = "개인정보 취급방침에 동의해주세요.";
      }

      if (Object.values(errorMsgs).some((error) => error !== "")) {
        setErrors(errorMsgs);
        return;
      }

      const profileData = {
        username: inputs.username,
        name: inputs.name,
        phone: signUpData.phone ? signUpData.phone : null,
        privacy: inputs.privacy,
        agreement: inputs.agreement,
        marketing: inputs.marketing,
      };

      console.log("profileData", profileData);
      console.log("signUpData", signUpData);

      if (signUpData.email && signUpData.password) {
        await profile.register({
          ...profileData,
          email: signUpData.email,
          password: signUpData.password,
          phone: signUpData.phone,
        });
        dispatch(signupSlice.actions.resetSignup());

        router.push("/signup/complete");
      }
      // 소셜 로그인 프로필 업데이트인 경우
      else {
        const response = await profile.updateProfile(profileData);

        if (response) {
          const getProfileResponse = await profile.getProfile();

          // 세션 업데이트 전에 새로운 세션 객체 생성
          const newSession = {
            ...session,
            user: {
              ...session?.user,
              profile: {
                ...getProfileResponse.data,
                agreement: inputs.agreement,
                privacy: inputs.privacy,
                marketing: inputs.marketing,
                name: inputs.name,
                username: inputs.username,
              },
            },
          };

          // 세션 업데이트
          await update(newSession);

          // 세션 업데이트 확인
          let updatedSession = null;
          let attempts = 0;
          const maxAttempts = 10;

          while (
            !updatedSession?.user?.profile?.agreement &&
            attempts < maxAttempts
          ) {
            await new Promise((resolve) => setTimeout(resolve, 500));
            updatedSession = await getSession();

            // 세션이 성공적으로 업데이트되었는지 확인
            if (updatedSession?.user?.profile?.agreement === inputs.agreement) {
              window.location.href = "/";
              return;
            }
            attempts++;
          }

          // 세션 업데이트가 실패한 경우 강제로 페이지 새로고침
          if (attempts >= maxAttempts) {
            window.location.href = "/";
          }
        }
      }
      // const response = await getProfile({ userId: "1" });
      // const response = await fetch("/api/profile", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     email: signUpData.email,
      //     password: signUpData.password,
      //     phone: signUpData.phone,
      //     username: inputs.username,
      //     name: inputs.name,
      //     privacy: inputs.privacy,
      //     agreement: inputs.agreement,
      //     marketing: inputs.marketing,
      //   }),
      // });

      // if (response.ok) {
      //   router.push("/signup/complete");
      // }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error", error);
        // setErrors({
        //   ...errors,
        //   serverError:
        //     error.response?.data?.message || "서버 오류가 발생했습니다",
        // });
      }
    }
  };

  return (
    <ProfileSetupForm
      inputs={inputs}
      errors={errors}
      onInputChange={(name: string, value: string) =>
        setInputs({ ...inputs, [name]: value })
      }
      onAgreementChange={handleAgreementChange}
      onSubmit={handleSubmit}
    />
  );
};

export default ProfileSetupContainer;
