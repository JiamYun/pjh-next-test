// src/store/slices/notificationSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Notification {
  id: number;
  title: string;
  content: string;
  readType: string;
  createdAt: string;
}

interface NotificationState {
  notifications: Notification[];
  selectedNotification: Notification | null;
  pending: {
    readAllNotification: boolean;
  };
}

const initialState: NotificationState = {
  notifications: [],
  selectedNotification: null,
  pending: {
    readAllNotification: false,
  },
};

export const onReadAllNotification = createAsyncThunk(
  "header/onReadAllNotification",
  async (data, thunkAPI) => {
    console.log(data);
    console.log("데이터 업로드 중...", data);

    return "success";
  }
);

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotifications: (state, action: PayloadAction<Notification[]>) => {
      state.notifications = action.payload;
    },
    appendNotifications: (state, action: PayloadAction<Notification[]>) => {
      state.notifications = [...state.notifications, ...action.payload];
    },
    setSelectedNotification: (
      state,
      action: PayloadAction<Notification | null>
    ) => {
      state.selectedNotification = action.payload;
    },
    updateNotificationRead: (state, action: PayloadAction<number>) => {
      const notification = state.notifications.find(
        (n) => n.id === action.payload
      );
      if (notification) {
        notification.readType = "READ";
      }
    },
    updateAllNotificationsRead: (state) => {
      state.notifications = state.notifications.map((n) => ({
        ...n,
        readType: "READ",
      }));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(onReadAllNotification.pending, (state) => {
        state.pending.readAllNotification = true;
      })
      .addCase(onReadAllNotification.rejected, (state) => {
        state.pending.readAllNotification = false;
      })
      .addCase(onReadAllNotification.fulfilled, (state, action) => {
        state.pending.readAllNotification = false;
        console.log("check", action.payload);
      });
  },
});

export default notificationSlice;
