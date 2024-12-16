// 게시글 작성 관리 훅
type UploadHandler = {
  handler: (() => Promise<void>) | null;
  isValid: boolean;
  mode: "create" | "edit" | null;
};

let uploadHandler: UploadHandler = {
  handler: null,
  isValid: false,
  mode: null,
};

export const useUploadPost = () => {
  const setUploadHandler = (
    handler: (() => Promise<void>) | null,
    isValid: boolean,
    mode: "create" | "edit" | null
  ) => {
    uploadHandler = { handler, isValid, mode };
  };

  const getUploadHandler = () => uploadHandler;

  return { setUploadHandler, getUploadHandler };
};
