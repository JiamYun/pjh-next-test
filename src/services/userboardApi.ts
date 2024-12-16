import { BaseApiClient } from "./baseApi";
import { UserBoardType } from "@/types";

class UserBoardApiClient extends BaseApiClient {
  async getHotPosts() {
    return this.client.get<UserBoardType[]>("/userboard/post/hotposts");
  }

  async getList(page: number, pageSize: number) {
    return this.client.get<UserBoardType[]>("/userboard/post/list", {
      params: { page, pageSize },
    });
  }

  async getPost(id: number) {
    return this.client.get<UserBoardType>(`/userboard/post/${id}`);
  }

  async getMyPosts(page: number, pageSize: number) {
    return this.client.get<UserBoardType[]>("/userboard/post/myposts", {
      params: { page, pageSize },
    });
  }

  async createPost(data: {
    title: string;
    content: string;
    categoryId: number;
  }) {
    return this.client.post<UserBoardType>("/userboard/post/register", data);
  }

  async updatePost(
    id: number,
    data: {
      title: string;
      content: string;
      categoryId: number;
    }
  ) {
    return this.client.post<UserBoardType>(
      `/userboard/post/update?id=${id}`,
      data
    );
  }

  async deletePost(id: number) {
    return this.client.post<void>(`/userboard/post/delete?id=${id}`);
  }
}

export const userBoardApi = new UserBoardApiClient();
