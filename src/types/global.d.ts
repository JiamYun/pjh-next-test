interface Window {
  __WEBVIEW_TOKEN__?: string;
  ReactNativeWebView?: {
    postMessage: (message: string) => void;
  };
}
