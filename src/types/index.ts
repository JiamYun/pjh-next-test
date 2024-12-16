import { IconName, IconType } from "./icons";

export type { IconName, IconType };

export type Notification = {
  id: number;
  title: string;
  content: string;
  createdAt: any;
  updatedAt: any;
  readType: string;
};

export type NoticeType = {
  id: number;
  title: string;
  content: string;
  createdAt: any;
  updatedAt: any;
  categoryId: number;
  fixed: boolean;
  category: {
    id: number;
    name: string;
  };
};

export type UserBoardType = {
  id: number;
  title: string;
  content: string;
  createdAt: any;
  updatedAt: any;
  categoryId: number;
  ViewCount: number;
  category: {
    id: number;
    name: string;
  };
  author: {
    id: number;
    profile: {
      username: string;
    };
  };
};

export type CategoryType = {
  id: number;
  name: string;
};

export const BannerType = {
  APP: "APP",
  WEB: "WEB",
} as const;

export const RankType = {
  JUN: "준회원",
  JAJO: "자조회원",
  JOONGHEUNG: "중흥회원",
  BOOGUK: "부국회원",
  UNRANKED: "예비회원",
} as const;
export type RankType = (typeof RankType)[keyof typeof RankType];
