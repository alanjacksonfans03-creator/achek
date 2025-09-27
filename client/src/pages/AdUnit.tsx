import { useEffect } from "react";

type AdUnitProps = {
  slot: string;
  format?: string;
  layout?: string;
  className?: string;
};

export const AdUnit = ({ slot, format = "auto", layout, className }: AdUnitProps) => {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error("AdSense error", err);
    }
  }, []);

  return (
    <ins
      className={`adsbygoogle ${className || ""}`}
      style={{ display: "block" }}
      data-ad-client="ca-pub-5807971758805138"
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive="true"
      {...(layout ? { "data-ad-layout": layout } : {})}
    />
  );
};
