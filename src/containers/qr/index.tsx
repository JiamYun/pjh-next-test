"use client";

import { QRView } from "@/components/qr";
import { useEffect, useState } from "react";

// 임시 데이터
const MOCK_USER = {
  name: "홍길동",
  username: "user123",
  rank: "정회원",
};

export const QRContainer = ({ onClose }: { onClose: () => void }) => {
  const [qrCode, setQRCode] = useState<string>("");

  useEffect(() => {
    // 추후 실제 API 연동
    setQRCode("sample-qr-code-123");
  }, []);

  return (
    <QRView
      user={MOCK_USER}
      qrCode={qrCode}
      qrValue={`https://www.516.co.kr/qrcode/${qrCode}?username=${MOCK_USER.username}`}
      onClose={onClose}
    />
  );
};
