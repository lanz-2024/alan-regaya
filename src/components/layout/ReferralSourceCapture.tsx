'use client';
import { useEffect } from 'react';
import { detectSource, SOURCE_STORAGE_KEY } from '@/lib/referral-source';

// Runs once per full page load. Client-side navigation keeps document.referrer from the
// original landing, and internal/reload referrers resolve to null, so a stored external
// source is only replaced when the visitor lands again from another site.
export function ReferralSourceCapture() {
  useEffect(() => {
    const source = detectSource(window.location.href, document.referrer);
    if (!source) return;
    try {
      sessionStorage.setItem(SOURCE_STORAGE_KEY, source);
    } catch {
      /* storage blocked — the enquiry is sent without a source */
    }
  }, []);

  return null;
}
