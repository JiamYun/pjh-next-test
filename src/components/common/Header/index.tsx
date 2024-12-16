"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Frame } from "@/atoms";
import { useAppDispatch, useAppSelector } from "@/store";
import { colors, UseBorderStyleProps } from "@/styles";
import { usePathname } from "next/navigation";
import useHeader from "./useHeader";
import notificationSlice, {
  onReadAllNotification,
} from "@/store/slices/notificationSlice";
import { routes, Routes } from "@/hooks";
import { useApi } from "@/hooks/useApi";
import { useHeaderConfig } from "@/hooks/useHeaderConfig";
import { useUploadPost } from "@/hooks/useUploadPost";
import BottomModal from "@/components/common/BottomModal";
import { Toast } from "../Toast";

interface HeaderProps {
  h?: number;
}

const Header: React.FC<HeaderProps> = ({ h = 44 }) => {
  const { notification } = useApi();
  const { getUploadHandler } = useUploadPost();
  const [showToast, setShowToast] = useState(false);

  const pathname = usePathname();
  const safeArea = useAppSelector((state) => state.app.response.safeArea);
  const [isHeader, setIsHeader] = useState(true);
  const [path, setPath] = useState<Routes>(routes.main);
  const { shouldShowDotButton } = useHeaderConfig();
  const { icon, image, text, title } = useHeader();
  const { readAllNotification } = useAppSelector(
    (state) => state.notification.pending
  );

  const dispatch = useAppDispatch();

  const [showDotModal, setShowDotModal] = useState(false);
  const router = useRouter();
  const { userboard } = useApi();

  const handleEdit = (postId: string) => {
    setShowDotModal(false);
    router.push(`/userboard/${postId}/edit`);
  };

  const handleDelete = async (postId: string) => {
    const isConfirmed = window.confirm("삭제하시겠습니까?");
    if (!isConfirmed) return;

    try {
      await userboard.deletePost(Number(postId));
      router.replace("/userboard");
    } catch (error) {
      console.error("Failed to delete userboard:", error);
    }
    setShowDotModal(false);
  };

  const postId = pathname?.split("/")[2];

  const headerPropsMap: Partial<
    Record<
      Routes,
      {
        left?: React.ReactNode | React.ReactNode[];
        center?: React.ReactNode | React.ReactNode[];
        right?: React.ReactNode | React.ReactNode[];
        stroke?: UseBorderStyleProps["stroke"];
      }
    >
  > = {
    "/": {
      left: image.logoImage(),
      right: [
        { ...icon.bellButton(), key: "0" },
        { ...icon.menuButton(), key: "1" },
      ],
      stroke: {
        perSide: ["bottom"],
        size: 1,
        color: "#F0F0F0",
      },
    },
    "/userboard": {
      left: title.userboardTitle(),
      right: [
        { ...icon.bellButton(), key: "0" },
        { ...icon.menuButton(), key: "1" },
      ],
    },
    "/donation": {
      left: title.donationTitle(),
      right: [
        { ...icon.bellButton(), key: "0" },
        { ...icon.menuButton(), key: "1" },
      ],
    },
    "/profile": {
      left: title.myPageTitle(),
      right: [
        { ...icon.bellButton(), key: "0" },
        { ...icon.menuButton(), key: "1" },
      ],
    },
    "/menu": {
      left: title.menuTitle(),
      right: [
        { ...icon.bellButton(), key: "0" },
        { ...icon.xButton(), key: "1" },
      ],
    },
    "/notification": {
      left: [
        { ...icon.backButton(), key: "0" },
        { ...title.notificationTitle(), key: "1" },
      ],
      right: text.readAllButton(readAllNotification, () => {
        notification.readAll();
        dispatch(notificationSlice.actions.updateAllNotificationsRead());
        setShowToast(true);
      }),
    },
    "/userboard/[id]": {
      left: icon.backButton(),
      right: shouldShowDotButton
        ? icon.dotButton(() => setShowDotModal(true))
        : null,
    },
    "/userboard/[id]/edit": {
      left: icon.backButton(),
      right: text.uploadButton(undefined, () => {
        const { handler, isValid } = getUploadHandler();
        if (handler && isValid) {
          handler();
        }
      }),
    },
    "/userboard/write": {
      left: icon.backButton(),
      right: text.uploadButton(undefined, () => {
        const { handler, isValid } = getUploadHandler();
        if (handler && isValid) {
          handler();
        }
      }),
    },
    "/notification/[id]": {
      left: icon.backButton(),
    },
    "/menu/museum": {
      left: icon.backButton(),
    },
    "/menu/directions": {
      left: icon.backButton(),
    },
    "/menu/facility": {
      left: icon.backButton(),
    },
    "/menu/foundation": {
      left: icon.backButton(),
    },
    "/menu/library": {
      left: icon.backButton(),
    },
    "/menu/storyum": {
      left: icon.backButton(),
    },
    "/policies/terms": {
      left: icon.backButton(),
    },
    "/policies/privacy": {
      left: icon.backButton(),
    },
    "/notice": {
      left: icon.backButton(),
    },
    "/notice/[id]": {
      left: icon.backButton(),
    },
    "/profile/membership": {
      left: icon.backButton(),
      center: title.membershipTitle(),
    },
    "/profile/settings": {
      left: [
        { ...icon.backButton(), key: "0" },
        { ...title.profileSettingsTitle(), key: "1" },
      ],
    },
    "/president-info": {
      left: icon.backButton(),
      center: title.presidentInfoTitle(),
    },
    "/profile/myposts": {
      left: icon.backButton(),
      center: title.myPostsTitle(),
    },
    "/profile/settings/info": {
      left: [
        { ...icon.backButton(), key: "0" },
        { ...title.profileSettingsTitle(), key: "1" },
      ],
    },
  };

  useEffect(() => {
    const visibilityChangeHandler = () => {
      try {
        if (typeof window !== undefined) {
          if (location.pathname.includes("/edit")) {
            setIsHeader(true);
            setPath("/userboard/[id]/edit" as Routes);
            return;
          }

          if (
            Object.keys(headerPropsMap).some(
              (path) => path === location.pathname
            )
          ) {
            setIsHeader(
              headerPropsMap[location.pathname as Routes] ? true : false
            );
            setPath(location.pathname as Routes);
          } else {
            const filteredPath = Object.keys(headerPropsMap).filter((v) =>
              location.pathname.includes(v.replace("[id]", ""))
            );
            if (filteredPath.length > 2) {
              setPath(
                filteredPath.filter((v) => v.includes("[id]"))[0] as Routes
              );
            } else {
              setIsHeader(false);
            }
          }
        }
      } catch (e) {
        console.error(e);
      }
    };
    visibilityChangeHandler();
  }, [pathname]);

  return (
    <>
      {isHeader && (
        <>
          <Frame w={"100%"} bg={safeArea.color.top} minH={h} h={h} />
          <Frame
            row
            bg={colors.white}
            position="fixed"
            top={0}
            left={0}
            w={"100%"}
            px={20}
            zIndex={9999}
            gap={"auto"}
            alignment="center"
            pt={safeArea.size.top}
            h={h + safeArea.size.top}
            minH={h + safeArea.size.top}
            stroke={
              headerPropsMap[path]?.stroke as UseBorderStyleProps["stroke"]
            }
          >
            <Frame row h={"100%"} alignment="center" gap={16} zIndex={100}>
              {headerPropsMap[path]?.left}
            </Frame>
            <Frame
              w={"100%"}
              h={"100%"}
              alignment="center"
              position={"absolute"}
              inset={0}
              zIndex={99}
            >
              {headerPropsMap[path]?.center}
            </Frame>
            <Frame row h={"100%"} alignment="center" gap={10} zIndex={100}>
              {headerPropsMap[path]?.right}
            </Frame>
          </Frame>
        </>
      )}
      <BottomModal
        show={showDotModal}
        onClose={() => setShowDotModal(false)}
        actions={[
          {
            label: "수정",
            onClick: () => handleEdit(postId as string),
            color: colors.main[300],
          },
          {
            label: "삭제",
            onClick: () => handleDelete(postId as string),
            color: colors.red[300],
          },
        ]}
      />
      {showToast && (
        <Toast message="모두 읽기 완료" onClose={() => setShowToast(false)} />
      )}
    </>
  );
};

export default Header;
