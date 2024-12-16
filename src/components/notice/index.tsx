"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Frame } from "@/atoms";
import Badge from "@/components/common/Badge";
import { Body4, Body5 } from "@/atoms";
import { CategoryType, NoticeType } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { formatDate } from "@/utils";
import Icon from "@/components/common/Icon";
import noticeSlice from "@/store/slices/noticeSlice";

interface Props {
  noticeList: NoticeType[];
  isSummary?: boolean;
  categories?: CategoryType[];
  onCategorySelect: (categoryId: number | null) => void;
  selectedCategoryId: number | null;
}

const Notice = ({
  noticeList,
  isSummary = false,
  categories,
  onCategorySelect,
  selectedCategoryId,
}: Props) => {
  const router = useRouter();
  const [filteredNotices, setFilteredNotices] = useState<NoticeType[]>([]);
  const [category, setCategory] = useState<CategoryType[]>([]);

  useEffect(() => {
    // 카테고리 설정
    if (categories && categories.length > 0) {
      setCategory(categories);
    } else if (noticeList.length > 0) {
      const uniqueCategories = Array.from(
        new Set(noticeList.map((notice) => JSON.stringify(notice.category)))
      ).map((str) => JSON.parse(str));
      setCategory(uniqueCategories);
    }
  }, [categories, noticeList]);

  useEffect(() => {
    // 공지사항 필터링
    if (isSummary) {
      // 최근 5개만 보여주기
      // const recentNotices = [...noticeList]
      //   .sort(
      //     (a, b) =>
      //       new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      //   )
      //   .slice(0, 5);
      // setFilteredNotices(recentNotices);
      setFilteredNotices(noticeList);
    } else {
      // 기존 로직 유지
      const fixed = noticeList.filter((notice) => notice.fixed);
      const normal = noticeList.filter((notice) => !notice.fixed);

      const filtered = selectedCategoryId
        ? [...fixed, ...normal].filter(
            (notice) => notice.category.id === selectedCategoryId
          )
        : [...fixed, ...normal];

      setFilteredNotices(filtered);
    }
  }, [noticeList, selectedCategoryId, isSummary]);

  return (
    <Frame col w="100%">
      {!isSummary ? (
        <Frame row px={20} py={16} gap={8} w="100%" overflow="x-scroll">
          <Badge
            categoryID={-1}
            selectedCategoryId={selectedCategoryId}
            onPress={() => onCategorySelect(null)}
          >
            전체
          </Badge>
          {category.map((category) => (
            <Badge
              key={`category_${category.id}`}
              categoryID={category.id}
              selectedCategoryId={selectedCategoryId}
              onPress={() => onCategorySelect(category.id)}
            >
              {category.name}
            </Badge>
          ))}
        </Frame>
      ) : null}

      <Frame col w="100%">
        {filteredNotices.length > 0 ? (
          isSummary ? (
            filteredNotices.map((notice) => (
              <Frame
                row
                alignment="center"
                key={`noticeView_${notice.id}`}
                py={4}
                onClick={() => router.push(`/notice/${notice.id}`)}
                px={20}
              >
                <Badge categoryID={notice.category.id}>
                  {notice.category.name}
                </Badge>
                <Frame row flex={1} pl={8}>
                  <Body4 numberOfLine="1">{notice.title}</Body4>
                </Frame>
              </Frame>
            ))
          ) : (
            filteredNotices.map((notice) => (
              <Frame
                col
                w="100%"
                alignment="center"
                key={`noticeView_${notice.id}`}
                px={20}
                py={8}
                onClick={() => router.push(`/notice/${notice.id}`)}
                stroke={{
                  size: 1,
                  color: "#F0F0F0",
                  perSide: ["bottom"],
                }}
              >
                <Frame row w="100%" flex={1} py={4}>
                  {notice.fixed && (
                    <Frame col alignment="left">
                      <Icon type="main" name="fixednotice" size={20} />
                    </Frame>
                  )}
                  <Body4
                    fontColor={"#3A3D43"}
                    pt={notice.fixed ? 1 : 0}
                    numberOfLine="1"
                  >
                    {notice.title}
                  </Body4>
                </Frame>
                <Frame col w="100%">
                  <Body4 numberOfLine="1">{notice.content}</Body4>
                  <Body4 fontColor="#CED3DB" numberOfLine="1" pt={4}>
                    {formatDate(notice.createdAt)} · 관리자
                  </Body4>
                </Frame>
              </Frame>
            ))
          )
        ) : (
          <Frame row w="100%" alignment="center" pt={20}>
            <Body4 fontColor="#CED3DB">작성된 소식이 없습니다</Body4>
          </Frame>
        )}
      </Frame>
    </Frame>
  );
};

export default Notice;
