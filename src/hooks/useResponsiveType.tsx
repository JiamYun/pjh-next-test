"use client";

import { useLayoutEffect, useState } from "react";

export type ResponsiveType = "mobile" | "tablet" | "desktop";

export default function useResponsiveType() {
  const [responsiveType, setResponsiveType] =
    useState<ResponsiveType>("desktop");

  useLayoutEffect(() => {
    const updateDevice = () => {
      if (window.innerWidth >= 1024) {
        setResponsiveType("desktop");
      } else if (window.innerWidth >= 768) {
        setResponsiveType("tablet");
      } else {
        setResponsiveType("mobile");
      }
    };

    updateDevice(); // Set initial device state
    window.addEventListener("resize", updateDevice); // Add resize listener

    return () => window.removeEventListener("resize", updateDevice); // Cleanup listener on unmount
  }, []);

  return { responsiveType };
}
