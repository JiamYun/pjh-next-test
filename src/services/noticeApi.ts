import { BaseApiClient } from "./baseApi";
import { NoticeType } from "@/types";

class NoticeApiClient extends BaseApiClient {
  async getList(page: number, pageSize: number, categoryId: number | null) {
    return this.client.get<NoticeType[]>("/notice/post/list", {
      params: { page, pageSize, categoryId },
    });
  }

  async getNotice(id: number) {
    return this.client.get<NoticeType>(`/notice/post/${id}`);
  }

  async getCategories() {
    return this.client.get<any[]>("/notice/category/list");
  }
}

export const noticeApi = new NoticeApiClient();
