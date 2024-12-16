import { BaseApiClient } from "./baseApi";

// class ProfileApiClient extends BaseApiClient {
//   async getProfile() {
//     const response = await this.get<any>("/api/profile");
//     return response;
//   }

//   async updateProfile(data: {
//     username?: string;
//     name?: string;
//     phone?: string | null;
//     privacy?: boolean;
//     agreement?: boolean;
//     marketing?: boolean;
//   }) {
//     console.log("profile data", data);
//     const response = await this.post<any>("/api/profile", data, {
//       params: { type: "update" },
//     });
//     return response;
//   }

//   async register(data: {
//     email: string;
//     password: string;
//     phone: string;
//     username?: string;
//     name: string;
//     privacy: boolean;
//     agreement: boolean;
//     marketing?: boolean;
//   }) {
//     const response = await this.post<any>("/api/profile", data, {
//       params: { type: "register" },
//     });
//     return response;
//   }
// }
interface ProfileData {
  username?: string;
  name?: string;
  phone?: string | null;
  privacy?: boolean;
  agreement?: boolean;
  marketing?: boolean;
  address?: string;
  address2?: string;
  image?: string;
}

interface RegisterData extends ProfileData {
  email: string;
  password: string;
  phone: string;
}
class ProfileApiClient extends BaseApiClient {
  async getProfile() {
    return this.client.get("/profile");
  }

  async updateProfile(data: ProfileData) {
    return this.client.post("/profile/update", data);
  }

  async register(data: RegisterData) {
    return this.client.post("/auth/register", data);
  }

  // async uploadProfileImage(formData: FormData) {
  //   try {
  //     const response = await this.client.post("/upload/profile", formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //         Authorization: this.client.defaults.headers.Authorization as string,
  //       },
  //     });
  //     console.log("response", response);
  //     return response;
  //   } catch (error) {
  //     console.error("Profile image upload failed:", error);
  //     console.log("로그", JSON.stringify(error, null, 2));
  //     throw error;
  //   }
  // }

  // 이미지 업로드 실제 서버 주소로 테스트 해보아야함.
  async uploadProfileImage(file: File) {
    try {
      const formData = new FormData();
      formData.append("files", file); // 백엔드의 FilesInterceptor('files')와 일치하도록 'files'로 변경

      console.log("formData", formData);

      const response = await this.client.post("/upload/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Upload response:", response);
      return response;
    } catch (error) {
      console.error("Profile image upload failed:", error);
      throw error;
    }
  }
}

export const profileApi = new ProfileApiClient();
