"use client";

import { ContentDocument } from "@/components/common/ContentDocument";

import marketingData from "@/constants/marketing.json";

export default function MarketingPage() {
  return <ContentDocument json={marketingData} />;
}
