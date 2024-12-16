"use client";

import { ContentDocument } from "@/components/common/ContentDocument";
import privacyData from "@/constants/privacy.json";

export default function PrivacyPage() {
  return <ContentDocument json={privacyData} />;
}
