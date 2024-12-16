import { BaseApiClient } from "./baseApi";

class VerifyApiClient extends BaseApiClient {
  async checkPhone(phone: string) {
    return this.client.post("/verify/check-phone", { phone });
  }

  async verifyCode(phone: string, inputCode: string, actualCode: string) {
    return this.client.post("/verify/verify-code", {
      phone,
      inputCode,
      actualCode,
    });
  }

  async changePhone(data: any) {
    return this.client.post("/verify/change-phone", data);
  }
}

export const verifyApi = new VerifyApiClient();
