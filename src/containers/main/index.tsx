import { useRouter } from "next/navigation";

import { Body5, Frame, Heading6 } from "@/atoms";
import { Divider, Icon, PresidentProfile, ProfileCard } from "@/components";
import Banner from "@/components/home/Banner";
import Middlebar from "@/components/home/Middlebar";
import { useEffect, useState } from "react";
import Notice from "@/components/notice";
import Link from "next/link";
import { HotPost } from "@/components/hotposts";
import { NoticeType, UserBoardType } from "@/types";
import { FrameScreen } from "@/atoms/Frame";
import { useAppDispatch } from "@/store";
import useCheckProfile from "@/hooks/useCheckProfile";
import { useApi } from "@/hooks/useApi";

const MainContainer = () => {
  // useCheckProfile();
  const { userboard, notice, banner } = useApi();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [bannerList, setBannerList] = useState<any[]>([]);
  const [noticeList, setNoticeList] = useState<NoticeType[]>([]);
  const [hotPostList, setHotPostList] = useState<UserBoardType[]>([]);

  // 배너 목록 가져오기
  const getBannerList = async () => {
    try {
      const response = await banner.getList(1, 3);
      setBannerList(response.data);
    } catch (error) {
      console.error("getBanner e: ", error);
    }
  };

  // 공지 목록 가져오기
  const getNoticeList = async () => {
    try {
      const response = await notice.getList(1, 5, null);
      setNoticeList(response.data);
    } catch (error) {
      console.error("getNotice e: ", error);
    }
  };

  // 핫포스트 목록 가져오기
  const getHotPostList = async () => {
    try {
      const response = await userboard.getHotPosts();
      setHotPostList(response.data);
    } catch (error) {
      console.error("getHotPost e: ", error);
    }
  };

  useEffect(() => {
    getBannerList();
    getNoticeList();
    getHotPostList();
  }, []);

  const handlePresidentInfoClick = () => {
    router.push("/president-info");
  };

  const handleProfileClick = () => {
    router.push("/profile");
  };

  return (
    <FrameScreen>
      <PresidentProfile onClick={handlePresidentInfoClick} />
      <ProfileCard onClick={handleProfileClick} />
      <Frame w="100%">
        <Divider />
      </Frame>
      <Middlebar />
      <Frame w="100%">
        <Divider />
      </Frame>
      <Banner bannerList={bannerList} />
      <Frame
        w="100%"
        row
        alignment="center"
        gap="auto"
        flex={1}
        px={20}
        py={12}
      >
        <Frame w="100%" row flex={1}>
          <Icon type="main" name="notice" size={28} />
          <Heading6 pl={10}>리멤버 소식</Heading6>
        </Frame>
        <Link href="/notice">
          <Body5 fontColor="#959CAA">더보기 {">"}</Body5>
        </Link>
      </Frame>
      <Notice
        isSummary
        onCategorySelect={() => {}}
        selectedCategoryId={null}
        noticeList={noticeList}
      />
      <Frame
        w="100%"
        row
        alignment="center"
        gap="auto"
        flex={1}
        px={20}
        py={12}
      >
        <Frame w="100%" row flex={1}>
          <Icon type="main" name="hot-post" size={28} />
          <Heading6 pl={10}>지금 뜨는 인기글</Heading6>
        </Frame>
      </Frame>
      <HotPost postList={hotPostList} />
    </FrameScreen>
  );
};

export default MainContainer;
