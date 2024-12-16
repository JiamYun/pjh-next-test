import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CategoryType, NoticeType } from "@/types";

interface NoticeState {
  notices: NoticeType[];
  categories: CategoryType[];
  selectedCategory: number | null;
  selectedNotice: NoticeType | null;
}

const initialState: NoticeState = {
  notices: [],
  categories: [],
  selectedCategory: null,
  selectedNotice: null,
};

const noticeSlice = createSlice({
  name: "notice",
  initialState,
  reducers: {
    setNotices: (state, action: PayloadAction<NoticeType[]>) => {
      state.notices = action.payload;
    },
    appendNotices: (state, action: PayloadAction<NoticeType[]>) => {
      state.notices = [...state.notices, ...action.payload];
    },
    setCategories: (state, action: PayloadAction<CategoryType[]>) => {
      state.categories = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<number | null>) => {
      state.selectedCategory = action.payload;
    },
    setSelectedNotice: (state, action: PayloadAction<NoticeType | null>) => {
      state.selectedNotice = action.payload;
    },
  },
});

export default noticeSlice;
