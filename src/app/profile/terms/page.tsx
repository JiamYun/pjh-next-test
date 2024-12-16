"use client";

import { ContentDocument } from "@/components/common/ContentDocument";
import termsData from "@/constants/terms.json";

export default function TermsPage() {
  return <ContentDocument json={termsData} />;
}
