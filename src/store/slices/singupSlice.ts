import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SignupState {
  step: "email" | "phone" | "profile";
  email: string;
  password: string;
  phone: string;
  isPhoneVerified: boolean;
  username: string;
  marketing: boolean;
}

const initialState: SignupState = {
  step: "email",
  email: "",
  password: "",
  phone: "",
  isPhoneVerified: false,
  username: "",
  marketing: false,
};

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    setEmailPassword: (
      state,
      action: PayloadAction<{ email: string; password: string }>
    ) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.step = "phone";
    },
    setPhone: (state, action: PayloadAction<string>) => {
      state.phone = action.payload;
    },
    setPhoneVerified: (state, action: PayloadAction<boolean>) => {
      state.isPhoneVerified = action.payload;
      if (action.payload) {
        state.step = "profile";
      }
    },
    setProfile: (
      state,
      action: PayloadAction<{ username: string; marketing: boolean }>
    ) => {
      state.username = action.payload.username;
      state.marketing = action.payload.marketing;
    },
    resetSignup: () => initialState,
  },
});

export const {
  setEmailPassword,
  setPhone,
  setPhoneVerified,
  setProfile,
  resetSignup,
} = signupSlice.actions;
export default signupSlice;
