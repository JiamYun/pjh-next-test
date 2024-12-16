import { UserBoardType } from "@/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserBoardState {
  posts: UserBoardType[]; // 타입 명시적 정의
  categories: any[];
  selectedCategory: number | null;
  pending: {
    uploadBoard: boolean;
  };
}

const initialState: UserBoardState = {
  posts: [], // 빈 배열로 초기화
  categories: [],
  selectedCategory: null,
  pending: {
    uploadBoard: false,
  },
};

export const onUploadBoard = createAsyncThunk(
  "header/onUploadBoard",
  async (data, thunkAPI) => {
    console.log(data);
    console.log("데이터 업로드 중...", data);

    return "success";
  }
);

const userboardSlice = createSlice({
  name: "userboard",
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<UserBoardType[]>) => {
      state.posts = action.payload;
    },
    appendPosts: (state, action: PayloadAction<UserBoardType[]>) => {
      state.posts = [...state.posts, ...action.payload];
    },
    setCategories: (state, action: PayloadAction<any[]>) => {
      state.categories = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<number | null>) => {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(onUploadBoard.pending, (state) => {
        state.pending.uploadBoard = true;
      })
      .addCase(onUploadBoard.rejected, (state) => {
        state.pending.uploadBoard = false;
      })
      .addCase(onUploadBoard.fulfilled, (state, action) => {
        state.pending.uploadBoard = false;
        console.log("check", action.payload);
      });
  },
});

export default userboardSlice;
