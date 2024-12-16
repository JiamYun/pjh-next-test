import { userBoardApi } from "./userboardApi";
import { noticeApi } from "./noticeApi";
import { notificationApi } from "./notificationApi";
import { profileApi } from "./profileApi";
import { bannerApi } from "./bannerApi";
import { verifyApi } from "./verifyApi";

export const api = {
  userboard: userBoardApi,
  notice: noticeApi,
  notification: notificationApi,
  profile: profileApi,
  banner: bannerApi,
  verify: verifyApi,
};
