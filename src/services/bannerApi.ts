import { BaseApiClient } from "./baseApi";

class BannerApiClient extends BaseApiClient {
  async getList(page: number, pageSize: number) {
    return this.client.get<any[]>("/banner/list", {
      params: { page, pageSize },
    });
  }
}

export const bannerApi = new BannerApiClient();
