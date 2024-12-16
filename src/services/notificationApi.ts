import { BaseApiClient } from "./baseApi";
// import { NotificationType } from "@/types";

class NotificationApiClient extends BaseApiClient {
  async getList(page: number, pageSize: number) {
    return this.client.get<any[]>("/notification", {
      params: { page, pageSize },
    });
  }

  async getOne(id: number) {
    return this.client.get<any>(`/notification/${id}`);
  }

  async readAll() {
    return this.client.patch<void>("/notification/readAll");
  }

  async readOne(id: number) {
    return this.client.patch<void>(`/notification/${id}/read`);
  }

  async delete(id: number) {
    return this.client.delete<void>(`/notification/${id}`);
  }

  async deleteAll() {
    return this.client.delete<void>("/notification/all");
  }
}

export const notificationApi = new NotificationApiClient();
