"use client";

import { Body3, Body4, Frame } from "@/atoms";
import { FrameScreen } from "@/atoms/Frame";
import { ButtonSolid } from "@/components/common/Button";
import { Checkbox } from "@/components/common/Checkbox";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useApi } from "@/hooks/useApi";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/common/ImageUpload";
import AddressLookup from "@/components/addressLookup";

const ProfileSettingsInfoContainer = () => {
  const router = useRouter();
  const { data: session, update } = useSession();
  const { profile } = useApi();
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [inputs, setInputs] = useState({
    username: "",
    name: "",
    marketing: false,
    address: "",
    address2: "",
  });
  const [imageUrl, setImageUrl] = useState("");

  const handleAddressComplete = (address: string) => {
    setInputs((prev) => ({
      ...prev,
      address,
    }));
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await profile.getProfile();

        if (response?.data) {
          setInputs({
            username: response.data.profile.username || "",
            name: response.data.profile.name || "",
            marketing: response.data.profile.marketing || false,
            address: response.data.profile.address || "",
            address2: response.data.profile.address2 || "",
          });
        }
      } catch (error) {
        console.error("프로필 정보 가져오기 실패:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await profile.updateProfile({
        username: inputs.username,
        name: inputs.name,
        marketing: inputs.marketing,
        address: inputs.address,
        address2: inputs.address2,
      });

      if (response?.data) {
        const newSession = {
          ...session,
          user: {
            ...session?.user,
            profile: {
              ...session?.user?.profile,
              ...response.data.profile,
            },
          },
        };
        await update(newSession);
      }

      router.push("/profile");
    } catch (error) {
      console.error("프로필 업데이트 실패:", error);
    }
  };

  const handleImageChange = async (file: File) => {
    try {
      console.log("Selected file:", file);

      const formData = new FormData();
      formData.append("files", file);

      formData.forEach((value, key) => {
        console.log(`${key}:`, value);
      });

      const response = await profile.uploadProfileImage(file);

      if (response?.data?.image) {
        setImageUrl(response.data.image);

        await profile.updateProfile({
          ...inputs,
          image: response.data.image,
        });

        const newSession = {
          ...session,
          user: {
            ...session?.user,
            profile: {
              ...session?.user?.profile,
              ...response.data.profile,
            },
          },
        };
        await update(newSession);
      }
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
    }
  };

  return (
    <FrameScreen>
      <Frame col w="100%" px={20} gap={32}>
        <Frame col w="100%" alignment="center" py={20}>
          <ImageUpload
            imageUrl={imageUrl || session?.user?.profile?.image || ""}
            onImageChange={handleImageChange}
          />
        </Frame>

        <Frame col w="100%" gap={16}>
          <Body4 fontColor="#959CAA">이름</Body4>
          <input
            className="w-full p-4 border border-gray-200 rounded-lg"
            value={inputs.name}
            onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
            placeholder="이름을 입력해주세요"
          />
        </Frame>

        <Frame col w="100%" gap={16}>
          <Body4 fontColor="#959CAA">닉네임</Body4>
          <input
            className="w-full p-4 border border-gray-200 rounded-lg"
            value={inputs.username}
            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
            placeholder="닉네임을 입력해주세요"
          />
        </Frame>

        <Frame col w="100%" gap={16}>
          <Body4 fontColor="#959CAA">주소</Body4>
          <input
            className="w-full p-4 border border-gray-200 rounded-lg"
            placeholder="주소를 입력해주세요"
            value={inputs.address}
            onClick={() => setShowAddressModal(true)}
          />
          <input
            className="w-full p-4 border border-gray-200 rounded-lg"
            placeholder="상세주소를 입력해주세요"
            value={inputs.address2}
            onChange={(e) => setInputs({ ...inputs, address2: e.target.value })}
          />
        </Frame>

        <Frame w="100%" py={16}>
          <Checkbox
            text="마케팅 정보 수신 동의"
            isChecked={inputs.marketing}
            onClick={() =>
              setInputs({ ...inputs, marketing: !inputs.marketing })
            }
          />
        </Frame>

        <ButtonSolid onClick={handleSubmit} fullWidth>
          회원정보변경
        </ButtonSolid>
      </Frame>
      <AddressLookup
        show={showAddressModal}
        onClose={() => setShowAddressModal(false)}
        onComplete={handleAddressComplete}
      />
    </FrameScreen>
  );
};

export default ProfileSettingsInfoContainer;
