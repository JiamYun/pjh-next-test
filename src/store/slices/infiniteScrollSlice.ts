import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InfiniteScrollState {
  page: number;
  hasMore: boolean;
  isLoading: boolean;
  pageSize: number;
}

const initialState: InfiniteScrollState = {
  page: 1,
  hasMore: true,
  isLoading: false,
  pageSize: 10,
};

const infiniteScrollSlice = createSlice({
  name: 'infiniteScroll',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setHasMore: (state, action: PayloadAction<boolean>) => {
      state.hasMore = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    resetScroll: (state) => {
      state.page = 1;
      state.hasMore = true;
      state.isLoading = false;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
    },
  },
});

export default infiniteScrollSlice;